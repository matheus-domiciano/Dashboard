function UsToBrDate(iso: string): string {
  const [data, hora] = iso.split(' ');
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano} ${hora}`;
}

export default UsToBrDate
