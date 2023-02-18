interface Children {
  children: React.ReactNode;
}

export default function Layout({ children }: Children) {
  return <div className="container mx-auto px-5 md:px-28">{children}</div>;
}
