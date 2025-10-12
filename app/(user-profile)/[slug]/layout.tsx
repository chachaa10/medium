interface UserPageLayoutProps {
  children: React.ReactNode;
}
export default function UserPageLayout({ children }: UserPageLayoutProps) {
  return <div>{children}</div>;
}
