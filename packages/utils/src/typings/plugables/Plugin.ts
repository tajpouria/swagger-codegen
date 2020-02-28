export interface IPlugin {
  plug(preGeneratedSchema: IPreGeneratedSchema): IPreGeneratedSchema;
}
