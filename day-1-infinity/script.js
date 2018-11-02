/* globals d3 */
// Set the dimensions of the canvas / graph
const margin = {top: 30, right: 20, bottom: 30, left: 50},
  width = 1000 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// Set the ranges
const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

// Adds the svg canvas
const svg = d3.select('#graph')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

const rho = 28;
const sigma = 10;
const beta = 8.0/3.0;
const dt = 0.0085;

const generatePoints = (numberOfPoints) => {
  const points = [];
  let x, y, z;
  // Set initial points
  [x, y, z] = [0.01, 0.01, 0.01];
  for(let i = 0; i < numberOfPoints; ++i)
  {
    let dx = sigma * (y - x);
    let dy = x * (rho - z) - y;
    let dz = x * y - beta * z;

    x += dx * dt;
    y += dy * dt;
    z += dz * dt;

    points.push({
      x: x,
      y: y,
      z: z
    });
  }
  return points;
};

const data = generatePoints(20000);

// Scale the range of the data
x.domain(d3.extent(data, d => d.y ));
y.domain([0, d3.max(data, d => d.z )]);

// Add the scatterplot
svg.selectAll('dot')
  .data(data)
  .enter().append('circle')
  .attr('r', 1)
  .attr('cx', d => x(d.y) )
  .attr('cy', d => y(d.z) );
