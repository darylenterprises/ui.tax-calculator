[![Apply Infrastructure](https://github.com/darylenterprises/ui.tax-calculator/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/darylenterprises/ui.tax-calculator/actions/workflows/deploy.yml)

# Tax Calculator PH 

Calculate your income tax.

## Contributions formula


```ts
const computeSss = (salary: number) => {
    const matrix = [
        [1000, 3249.99, 135],
        [3250, 3749.99, 157.5],
        [3750, 4249.99, 180],
        [4250, 4749.99, 202.5],
        [4750, 5249.99, 225],
        [5250, 5749.99, 247.5],
        [5750, 6249.99, 270],
        [6250, 6749.99, 292.5],
        [6750, 7249.99, 315],
        [7250, 7749.99, 337.5],
        [7750, 8249.99, 360],
        [8250, 8749.99, 382.5],
        [8750, 9249.99, 405],
        [9250, 9749.99, 427.5],
        [9750, 10249.99, 450],
        [10250, 10749.99, 472.5],
        [10750, 11249.99, 495],
        [11250, 11749.99, 517.5],
        [11750, 12249.99, 540],
        [12250, 12749.99, 562.5],
        [12750, 13249.99, 585],
        [13250, 13749.99, 607.5],
        [13750, 14249.99, 630],
        [14250, 14749.99, 652.5],
        [14750, 15249.99, 675],
        [15250, 15749.99, 697.5],
        [15750, 16249.99, 720],
        [16250, 16749.99, 742.5],
        [16750, 17249.99, 765],
        [17250, 17749.99, 787.5],
        [17750, 18249.99, 810],
        [18250, 18749.99, 832.5],
        [18750, 19249.99, 855],
        [19250, 19749.99, 877.5],
        [19750, 20249.99, 900],
        [20250, 20749.99, 900],
        [20750, 21249.99, 900],
        [21250, 21749.99, 900],
        [21750, 22249.99, 990],
        [22250, 22749.99, 900],
        [22270, 23249.99, 900],
        [23250, 23749.99, 900],
        [23750, 24249.99, 900],
        [24250, 24279.99, 900],
        [24750, NaN, 900],
    ];

    const bracket = (lower: number, upper: number) => (income: number) =>
        (Number.isNaN(lower) || income >= lower) &&
        (Number.isNaN(upper) || income <= upper);

    return matrix
        .filter((q) => bracket(q[0], q[1])(salary))
        .reduce((p, q) => (p += q[2]), 0);
};

const computePhilHealth = (monthly: number) => {
    const contrib = monthly * 0.03 * 0.5;
    return contrib >= 1800 ? 1800 : contrib
}

export const computeContributions = (
    employeeType: IEmployerType,
    monthly: number
): IMandatoryContributions => ({
    sss: employeeType === "pvt" ? computeSss(monthly) : NaN,
    gsis: employeeType === "govt" ? monthly * 0.09 : NaN,
    pagibig: 100,
    philHealth: computePhilHealth(monthly),
});

```

## Tax brackets
```ts

const brackets: { [key: string]: IBracket[] } = {
  2018: [
    {
      condition: bracketCondition(NaN, 250000),
      calculate: (_) => 0,
    },
    {
      condition: bracketCondition(250000, 400000),
      calculate: (q) => 0 + (q - 250000) * 0.2,
    },
    {
      condition: bracketCondition(400000, 800000),
      calculate: (q) => 30000 + (q - 400000) * 0.25,
    },
    {
      condition: bracketCondition(800000, 2000000),
      calculate: (q) => 130000 + (q - 800000) * 0.3,
    },
    {
      condition: bracketCondition(2000000, 8000000),
      calculate: (q) => 490000 + (q - 2000000) * 0.32,
    },
    {
      condition: bracketCondition(8000000, NaN),
      calculate: (q) => 2410000 + (q - 8000000) * 0.35,
    },
  ],
  2023: [
    {
      condition: bracketCondition(NaN, 250000),
      calculate: (_) => 0,
    },
    {
      condition: bracketCondition(250000, 400000),
      calculate: (q) => 0 + (q - 250000) * 0.15,
    },
    {
      condition: bracketCondition(400000, 800000),
      calculate: (q) => 22500 + (q - 400000) * 0.2,
    },
    {
      condition: bracketCondition(800000, 2000000),
      calculate: (q) => 102500 + (q - 800000) * 0.25,
    },
    {
      condition: bracketCondition(2000000, 8000000),
      calculate: (q) => 402500 + (q - 2000000) * 0.3,
    },
    {
      condition: bracketCondition(8000000, NaN),
      calculate: (q) => 2202500 + (q - 8000000) * 0.35,
    },
  ],
};

```