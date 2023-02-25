import { FormEventHandler, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
  onSubmit: (values: any) => void;
  style?: React.CSSProperties; // Define style as an optional prop
}

export function Form({ children, className, onSubmit, style }: Props) {
  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;
    const formData = new FormData(e.target);
    const values: any = {};
    for (const pair of formData.entries()) {
      values[pair[0]] = pair[1];
    }
    onSubmit(values);
  };

  return (
    <form onSubmit={submitHandler} className={className} style={style}>
      {children}
    </form>
  );
}
