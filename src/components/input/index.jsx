import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BipartiteGraph = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const updateGraph = () => {
      const container = svgRef.current.parentElement;

      const group1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
      const group2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];

      const width = container.offsetWidth / 2;
      const height = group1.length * 30 + 20;

      const nodes = [
        ...group1.map((node, index) => ({
          id: node,
          label: node,
          color: 'blue',
          x: 100,
          y: (group1.length * 30 / (group1.length - 1)) * index
        })),
        ...group2.map((node, index) => ({
          id: node,
          label: node,
          color: 'red',
          x: width - 100,
          y: (group1.length * 30 / (group2.length - 1)) * index
        }))
      ];

      const edges = [
        { from: 'A', to: '16' },
        { from: 'B', to: '11' },
        { from: 'C', to: '4' },
        { from: 'D', to: '12' },
        { from: 'E', to: '1' },
        { from: 'F', to: '9' },
        { from: 'G', to: '10' },
        { from: 'H', to: '2' },
        { from: 'I', to: '14' },
        { from: 'J', to: '7' },
        { from: 'K', to: '13' },
        { from: 'L', to: '5' }, 
        { from: 'M', to: '6' }, 
        { from: 'N', to: '3' }, 
        { from: 'O', to: '8' }, 
        { from: 'P', to: '15' }, 
      ];

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      svg.selectAll('circle').remove();
      svg.selectAll('line').remove();
      svg.selectAll('text').remove();

      svg.selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 10)
        .attr('fill', d => d.color);

      svg.selectAll('line')
        .data(edges)
        .enter()
        .append('line')
        .attr('x1', d => nodes.find(node => node.id === d.from).x)
        .attr('y1', d => nodes.find(node => node.id === d.from).y)
        .attr('x2', d => nodes.find(node => node.id === d.to).x)
        .attr('y2', d => nodes.find(node => node.id === d.to).y)
        .attr('stroke', '#000000');

      svg.selectAll('text')
        .data(nodes)
        .enter()
        .append('text')
        .attr('x', d => d.x + 15)
        .attr('y', d => d.y + 5)
        .text(d => d.label);
    };

    window.addEventListener('resize', updateGraph);
    updateGraph();

    return () => {
      window.removeEventListener('resize', updateGraph);
    };
  }, []);

  return <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />;
};

export default BipartiteGraph;