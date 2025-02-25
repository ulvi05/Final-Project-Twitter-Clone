type Props = {
  condition: boolean;
  children: React.ReactNode;
};

export const RenderIf = ({ children, condition }: Props) => {
  return condition ? <>{children}</> : null;
};
