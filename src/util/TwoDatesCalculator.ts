function TwoDatesCalculator(d1: string, d2: string) {
  const startDate = new Date(d1);
  const endDate = new Date(d2);

  const diffMs = endDate.getTime() - startDate.getTime(); 
  const totalMinutes = Math.floor(diffMs / 1000 / 60);
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}

export default TwoDatesCalculator