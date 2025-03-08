import { type FieldPath, type FieldValues } from 'react-hook-form';
import * as React from 'react';

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export const FormFieldContext =
  React.createContext<FormFieldContextValue | null>(null);

export type FormItemContextValue = {
  id: string;
};

export const FormItemContext = React.createContext<FormItemContextValue | null>(
  null,
);
