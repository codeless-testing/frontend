export class CasesListModel {
  id?: string;
  name?: string;
  updatedAt?: string;
  createdAt?: string;
}

export class CaseParams{
  width?: string;
  height?: string;
  color?: string;
  backgroundColor?: string;
  font?: string;
  fontSize?: string;
  borderSize?: string;
  borderColor?: string;
};

export class CaseModel{
  params?: CaseParams;
  class?: string;
  redirectUrl?: string;
  _id?: string;
}

export class CasesModel {
  _id?: string;
  clientId?: string;
  name?: string;
  cases?: CaseModel[];
  createdAt?: string;
  updatedAt?: string;
}
