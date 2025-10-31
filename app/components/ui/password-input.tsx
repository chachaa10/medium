"use client";

import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  type ChangeEvent,
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { cn } from "@/app/lib/utils/tailwind-merge";

const PasswordInputContext = createContext<{ password: string } | null>(null);

export function PasswordInput({
  className,
  children,
  onChange,
  value,
  defaultValue,
  ...props
}: Omit<ComponentProps<typeof Input>, "type"> & {
  children?: ReactNode;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(defaultValue ?? "");

  const Icon = showPassword ? EyeOffIcon : EyeIcon;
  const currentValue = value ?? password;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    onChange?.(e);
  };

  return (
    <PasswordInputContext value={{ password: currentValue.toString() }}>
      <div className="space-y-3">
        <div className="relative">
          <Input
            {...props}
            value={value}
            defaultValue={defaultValue}
            type={showPassword ? "text" : "password"}
            className={cn("pr-9", className)}
            onChange={handleChange}
          />
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="right-1 absolute inset-y-1/2 size-7 -translate-y-1/2"
            onClick={() => setShowPassword((p) => !p)}
          >
            <Icon className="size-5" />
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>
        {children}
      </div>
    </PasswordInputContext>
  );
}

export function PasswordInputStrengthChecker() {
  const [optionsLoaded, setOptionsLoaded] = useState(false);
  const [errorLoadingOptions, setErrorLoadingOptions] = useState(false);

  const { password } = usePasswordInput();
  const deferredPassword = useDeferredValue(password);
  const strengthResult = useMemo(() => {
    if (!optionsLoaded || deferredPassword.length === 0) {
      return { score: 0, feedback: { warning: undefined } } as const;
    }

    return zxcvbn(deferredPassword);
  }, [optionsLoaded, deferredPassword]);

  useEffect(() => {
    Promise.all([
      import("@zxcvbn-ts/language-common"),
      import("@zxcvbn-ts/language-en"),
    ])
      .then(([common, english]) => {
        zxcvbnOptions.setOptions({
          translations: english.translations,
          graphs: common.adjacencyGraphs,
          maxLength: 50,
          dictionary: {
            ...common.dictionary,
            ...english.dictionary,
          },
        });
        setOptionsLoaded(true);
      })
      .catch(() => setErrorLoadingOptions(true));
  }, []);

  function getLabel() {
    if (deferredPassword.length === 0) return "Password strength";
    if (!optionsLoaded) return "Loading strength checker";

    const score = strengthResult.score;
    switch (score) {
      case 0:
      case 1:
        return "Very weak";
      case 2:
        return "Weak";
      case 3:
        return "Strong";
      case 4:
        return "Very strong";
      default:
        throw new Error(`Invalid score: ${score satisfies never}`);
    }
  }

  const label = getLabel();

  if (errorLoadingOptions) return null;

  return (
    <div className="space-y-0.5">
      <div
        role="progressbar"
        aria-label="Password Strength"
        aria-valuenow={strengthResult.score}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuetext={label}
        className="flex gap-1"
      >
        {Array.from({ length: 4 }).map((_, i) => {
          const color =
            strengthResult.score === 2
              ? "bg-yellow-500"
              : strengthResult.score === 3
                ? "bg-green-400"
                : strengthResult.score === 4
                  ? "bg-green-500"
                  : "bg-destructive";

          return (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-full h-1",
                strengthResult.score > i ? color : "bg-secondary",
              )}
            />
          );
        })}
      </div>
      <div className="flex justify-end text-muted-foreground text-sm">
        {strengthResult.feedback.warning == null ? (
          label
        ) : (
          <Tooltip>
            <TooltipTrigger className="underline underline-offset-1">
              {label}
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={4} className="text-base">
              {strengthResult.feedback.warning}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

const usePasswordInput = () => {
  const context = useContext(PasswordInputContext);
  if (context == null) {
    throw new Error(
      "usePasswordInput must be used within a PasswordInputContext",
    );
  }
  return context;
};
