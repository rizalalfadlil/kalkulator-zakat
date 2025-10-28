export type ZakatType = 'fitrah' | 'maal' | null;

export type IrigasiType = 'berbayar' | 'alami';

export type TemuanType = 'rikaz' | 'tambang';

export interface MaalData {
  emas?: {
    gram: number;
    haul: number;
  };
  perak?: {
    gram: number;
    haul: number;
  };
  uang?: {
    total: number;
    haul: number;
  };
  pertanian?: {
    kg: number;
    irigasi: IrigasiType;
  };
  peternakan?: {
    kambing: number;
    sapi: number;
    haul: number;
  };
  rikaz?: {
    nilai: number;
    jenis: TemuanType;
  };
}

export interface MustahikSelection {
  [key: string]: boolean;
}

export type MustahikType = 'fakir' | 'miskin' | 'amil' | 'muallaf' | 'riqab' | 'gharim' | 'fi_sabilillah' | 'ibnu_sabil';
