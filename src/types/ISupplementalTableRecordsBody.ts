export interface SupplementalTableRecordsBody<RecordType> {
  insertOnNoMatch: "true" | "false";
  matchColumnNames?: string[];
  recordData: {
    fieldNames: string[];
    mapTemplateName?: string;
    records: RecordType[];
  };
  updateOnMatch: "REPLACE_ALL" | "NO_UPDATE";
}
