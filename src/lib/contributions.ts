const bracket = (lower: number, upper: number) => (income: number) =>
  (Number.isNaN(lower) || income >= lower) &&
  (Number.isNaN(upper) || income <= upper);

const bracketSSS = (lower: number, upper: number) => (income: number) =>
  (Number.isNaN(lower) || income >= lower) &&
  (Number.isNaN(upper) || income < upper);

const computeSss = (salary: number) => {
  const matrix = [
    [1000, 3250, 135, 0],
    [3250, 3750, 157.5, 0],
    [3750, 4250, 180, 0],
    [4250, 4750, 202.5, 0],
    [4750, 5250, 225, 0],
    [5250, 5750, 247.5, 0],
    [5750, 6250, 270, 0],
    [6250, 6750, 292.5, 0],
    [6750, 7250, 315, 0],
    [7250, 7750, 337.5, 0],
    [7750, 8250, 360, 0],
    [8250, 8750, 382.5, 0],
    [8750, 9250, 405, 0],
    [9250, 9750, 427.5, 0],
    [9750, 10250, 450, 0],
    [10250, 10750, 472.5, 0],
    [10750, 11250, 495, 0],
    [11250, 11750, 517.5, 0],
    [11750, 12250, 540, 0],
    [12250, 12750, 562.5, 0],
    [12750, 13250, 585, 0],
    [13250, 13750, 607.5, 0],
    [13750, 14250, 630, 0],
    [14250, 14750, 652.5, 0],
    [14750, 15250, 675, 0],
    [15250, 15750, 697.5, 0],
    [15750, 16250, 720, 0],
    [16250, 16750, 742.5, 0],
    [16750, 17250, 765, 0],
    [17250, 17750, 787.5, 0],
    [17750, 18250, 810, 0],
    [18250, 18750, 832.5, 0],
    [18750, 19250, 855, 0],
    [19250, 19750, 877.5, 0],
    [19750, 20250, 900, 0],
    [20250, 20750, 900, 22.5],
    [20750, 21250, 900, 45],
    [21250, 21750, 900, 67.5],
    [21750, 22250, 990, 90],
    [22250, 22750, 900, 112.5],
    [22750, 23250, 900, 135],
    [23250, 23750, 900, 157.5],
    [23750, 24250, 900, 180],
    [24250, 24750, 900, 202.5],
    [24750, NaN, 900, 225],
  ];

  const sss = matrix
    .filter((q) => bracketSSS(q[0], q[1])(salary))
    .reduce((p, q) => (p += q[2]), 0);
  const mpf = matrix
    .filter((q) => bracketSSS(q[0], q[1])(salary))
    .reduce((p, q) => (p += q[3]), 0);
  return { sss, mpf };
};

const philHealthTable = [
  [NaN, 10000, () => 400],
  [10000.01, 79999.99, (mon: number) => mon * 0.04],
  [80000, NaN, () => 3200],
];

const computePhilHealth = (monthly: number) =>
  philHealthTable
    .filter((q) => bracket(q[0] as number, q[1] as number)(monthly))
    .reduce((p, q) => (p += (q[2] as (mon: number) => number)(monthly)), 0) *
  0.5;

export const computeContributions = (
  employeeType: IEmployerType,
  monthly: number
): IMandatoryContributions => ({
  sss: employeeType === "pvt" ? computeSss(monthly).sss : NaN,
  sssMpf: employeeType === "pvt" ? computeSss(monthly).mpf : NaN,
  gsis: employeeType === "govt" ? monthly * 0.09 : NaN,
  pagibig: 100,
  philHealth: computePhilHealth(monthly),
});
