export enum ValidateType {
  required = 'required',
  maxlength = 'maxlength',
}

export interface ValidateParam {
  type: ValidateType
  arg?: any
}
