export function converteData(DataDDMMYY: string) {
    const dataSplit = DataDDMMYY.split('/');
    const novaData = new Date(
      parseInt(dataSplit[2], 10),
      parseInt(dataSplit[1], 10) - 1,
      parseInt(dataSplit[0], 10),
    );
    return novaData;
  }