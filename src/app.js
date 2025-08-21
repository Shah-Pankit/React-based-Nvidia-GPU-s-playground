import React, { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

// GPU Data - In a real app, this would be fetched from an API
// Added 'purpose' field and included some AWS-relevant GPUs
const gpuData = [
  {
    id: "gtx_1080_ti",
    name: "GeForce GTX 1080 Ti",
    series: "GTX 10 Series",
    architecture: "Pascal",
    release_date: "2017-03-10",
    use_cases: ["Gaming (High-End)", "VR", "Content Creation (Amateur)"],
    power_consumption: { tdp_watts: 250, typical_watts: 200 },
    specifications: {
      cuda_cores: 3584,
      vram_gb: 11,
      vram_type: "GDDR5X",
      memory_bus_bit: 352,
    },
    type: "Desktop",
    purpose: "Gaming", // Added purpose
    parent: "GTX 10 Series",
  },
  {
    id: "rtx_2080_ti",
    name: "GeForce RTX 2080 Ti",
    series: "RTX 20 Series",
    architecture: "Turing",
    release_date: "2018-09-20",
    use_cases: [
      "Gaming (4K)",
      "Ray Tracing",
      "AI/ML (Local, Enthusiast)",
      "Content Creation (Pro)",
    ],
    power_consumption: { tdp_watts: 250, typical_watts: 225 },
    specifications: {
      cuda_cores: 4352,
      vram_gb: 11,
      vram_type: "GDDR6",
      memory_bus_bit: 352,
    },
    type: "Desktop",
    purpose: "Gaming", // Added purpose
    parent: "RTX 20 Series",
  },
  {
    id: "rtx_3080",
    name: "GeForce RTX 3080",
    series: "RTX 30 Series",
    architecture: "Ampere",
    release_date: "2020-09-17",
    use_cases: [
      "Gaming (4K/High Refresh)",
      "AI/ML (Local, Pro)",
      "Content Creation (Pro)",
    ],
    power_consumption: { tdp_watts: 320, typical_watts: 300 },
    specifications: {
      cuda_cores: 8704,
      vram_gb: 10,
      vram_type: "GDDR6X",
      memory_bus_bit: 320,
    },
    type: "Desktop",
    purpose: "Gaming", // Added purpose
    parent: "RTX 30 Series",
  },
  {
    id: "rtx_3090",
    name: "GeForce RTX 3090",
    series: "RTX 30 Series",
    architecture: "Ampere",
    release_date: "2020-09-24",
    use_cases: [
      "Gaming (Extreme)",
      "AI/ML (Local, Advanced)",
      "Professional Rendering",
      "8K Video Editing",
    ],
    power_consumption: { tdp_watts: 350, typical_watts: 330 },
    specifications: {
      cuda_cores: 10496,
      vram_gb: 24,
      vram_type: "GDDR6X",
      memory_bus_bit: 384,
    },
    type: "Desktop",
    purpose: "Gaming", // Added purpose
    parent: "RTX 30 Series",
  },
  {
    id: "rtx_4090",
    name: "GeForce RTX 4090",
    series: "RTX 40 Series",
    architecture: "Ada Lovelace",
    release_date: "2022-10-12",
    use_cases: [
      "Gaming (Ultimate)",
      "AI/ML (Local, Cutting Edge)",
      "High-End Rendering",
      "Scientific Simulation",
    ],
    power_consumption: { tdp_watts: 450, typical_watts: 400 },
    specifications: {
      cuda_cores: 16384,
      vram_gb: 24,
      vram_type: "GDDR6X",
      memory_bus_bit: 384,
    },
    type: "Desktop",
    purpose: "Gaming", // Added purpose
    parent: "RTX 40 Series",
  },
  {
    id: "a100_80gb",
    name: "NVIDIA A100 80GB",
    series: "A100",
    architecture: "Ampere",
    release_date: "2020-11-16",
    use_cases: [
      "AI/ML (Server)",
      "HPC (Data Center)",
      "Cloud Computing",
      "Data Analytics",
      "AWS",
    ], // Added AWS
    power_consumption: { tdp_watts: 400, typical_watts: 350 },
    specifications: {
      cuda_cores: 6912,
      vram_gb: 80,
      vram_type: "HBM2e",
      memory_bus_bit: 5120,
    },
    type: "Data Center",
    purpose: "Deployment & Development", // Added purpose
    parent: "NVIDIA Data Center GPUs",
  },
  {
    id: "h100_pcie",
    name: "NVIDIA H100 PCIe",
    series: "H100",
    architecture: "Hopper",
    release_date: "2022-03-22",
    use_cases: [
      "AI/ML (Server, Large Scale)",
      "HPC (Exascale)",
      "Generative AI",
      "Scientific Research",
      "AWS",
    ], // Added AWS
    power_consumption: { tdp_watts: 700, typical_watts: 600 },
    specifications: {
      cuda_cores: 16896,
      vram_gb: 80,
      vram_type: "HBM3",
      memory_bus_bit: 5120,
    },
    type: "Data Center",
    purpose: "Deployment & Development", // Added purpose
    parent: "NVIDIA Data Center GPUs",
  },
  {
    id: "quadro_rtx_a6000",
    name: "Quadro RTX A6000",
    series: "RTX Professional",
    architecture: "Ampere",
    release_date: "2020-10-05",
    use_cases: [
      "Professional Visualization",
      "3D Design",
      "Rendering",
      "Scientific Visualization",
    ],
    power_consumption: { tdp_watts: 300, typical_watts: 250 },
    specifications: {
      cuda_cores: 10752,
      vram_gb: 48,
      vram_type: "GDDR6",
      memory_bus_bit: 384,
    },
    type: "Workstation",
    purpose: "Deployment & Development", // Added purpose
    parent: "RTX Professional",
  },
  {
    id: "geforce_gtx_1660_super",
    name: "GeForce GTX 1660 SUPER",
    series: "GTX 16 Series",
    architecture: "Turing",
    release_date: "2019-10-29",
    use_cases: ["Gaming (Mid-Range)", "Esports"],
    power_consumption: { tdp_watts: 125, typical_watts: 100 },
    specifications: {
      cuda_cores: 1408,
      vram_gb: 6,
      vram_type: "GDDR6",
      memory_bus_bit: 192,
    },
    type: "Desktop",
    purpose: "Gaming", // Added purpose
    parent: "GTX 16 Series",
  },
  {
    id: "rtx_4070_ti",
    name: "GeForce RTX 4070 Ti",
    series: "RTX 40 Series",
    architecture: "Ada Lovelace",
    release_date: "2023-01-05",
    use_cases: [
      "Gaming (High Refresh, QHD)",
      "AI/ML (Local)",
      "Content Creation",
    ],
    power_consumption: { tdp_watts: 285, typical_watts: 250 },
    specifications: {
      cuda_cores: 7680,
      vram_gb: 12,
      vram_type: "GDDR6X",
      memory_bus_bit: 192,
    },
    type: "Desktop",
    purpose: "Gaming", // Added purpose
    parent: "RTX 40 Series",
  },
  {
    id: "rtx_5090",
    name: "GeForce RTX 5090",
    series: "RTX 50 Series",
    architecture: "Blackwell",
    release_date: "2025-01-30", // Fictional, based on search results
    use_cases: [
      "Gaming (Next-Gen Ultimate)",
      "Advanced AI/ML",
      "Hyper-Realistic Rendering",
    ],
    power_consumption: { tdp_watts: 600, typical_watts: 550 },
    specifications: {
      cuda_cores: 24576,
      vram_gb: 48,
      vram_type: "GDDR7",
      memory_bus_bit: 512,
    }, // Fictional
    type: "Desktop",
    purpose: "Gaming", // Added purpose
    parent: "RTX 50 Series",
  },
  {
    id: "tesla_v100",
    name: "NVIDIA Tesla V100",
    series: "Tesla",
    architecture: "Volta",
    release_date: "2017-06-21",
    use_cases: [
      "AI Training",
      "Deep Learning",
      "HPC",
      "Cloud Computing",
      "AWS",
    ],
    power_consumption: { tdp_watts: 300, typical_watts: 250 },
    specifications: {
      cuda_cores: 5120,
      tensor_cores: "1st Gen",
      vram_gb: 16,
      vram_type: "HBM2",
      memory_bus_bit: 4096,
    },
    type: "Data Center",
    purpose: "Deployment & Development",
    parent: "NVIDIA Data Center GPUs",
  },
  {
    id: "tesla_t4",
    name: "NVIDIA Tesla T4",
    series: "Tesla",
    architecture: "Turing",
    release_date: "2018-09-13",
    use_cases: [
      "AI Inference",
      "Machine Learning",
      "Cloud Gaming (Server)",
      "Data Analytics",
      "AWS",
    ],
    power_consumption: { tdp_watts: 70, typical_watts: 60 },
    specifications: {
      cuda_cores: 2560,
      tensor_cores: "2nd Gen",
      vram_gb: 16,
      vram_type: "GDDR6",
      memory_bus_bit: 256,
    },
    type: "Data Center",
    purpose: "Deployment & Development",
    parent: "NVIDIA Data Center GPUs",
  },
  {
    id: "l4",
    name: "NVIDIA L4",
    series: "L4",
    architecture: "Ada Lovelace",
    release_date: "2023-03-21",
    use_cases: [
      "AI Inference",
      "Video Processing",
      "Cloud Gaming",
      "Generative AI (Smaller Models)",
      "AWS",
    ],
    power_consumption: { tdp_watts: 72, typical_watts: 60 },
    specifications: {
      cuda_cores: 7680,
      tensor_cores: "4th Gen",
      vram_gb: 24,
      vram_type: "GDDR6",
      memory_bus_bit: 384,
    },
    type: "Data Center",
    purpose: "Deployment & Development",
    parent: "NVIDIA Data Center GPUs",
  },
  {
    id: "rtx_4060",
    name: "GeForce RTX 4060",
    series: "RTX 40 Series",
    architecture: "Ada Lovelace",
    release_date: "2023-06-29",
    use_cases: ["Gaming (Mainstream)", "Streaming", "Light Content Creation"],
    power_consumption: { tdp_watts: 115, typical_watts: 100 },
    specifications: {
      cuda_cores: 3072,
      vram_gb: 8,
      vram_type: "GDDR6",
      memory_bus_bit: 128,
    },
    type: "Desktop",
    purpose: "Gaming",
    parent: "RTX 40 Series",
  },
];

// Helper to get unique values for filters
const getUniqueValues = (key) =>
  [...new Set(gpuData.map((gpu) => gpu[key]))].sort();

// Pre-process data for hierarchy
const createHierarchyData = (data) => {
  const architectures = {};
  data.forEach((gpu) => {
    if (!architectures[gpu.architecture]) {
      architectures[gpu.architecture] = {
        name: gpu.architecture,
        children: {},
      };
    }
    if (!architectures[gpu.architecture].children[gpu.series]) {
      architectures[gpu.architecture].children[gpu.series] = {
        name: gpu.series,
        children: [],
      };
    }
    architectures[gpu.architecture].children[gpu.series].children.push({
      name: gpu.name,
      id: gpu.id,
      data: gpu,
    });
  });

  // Filter out architectures/series that have no children after filtering
  const filteredArchitectures = Object.values(architectures)
    .filter((arch) => Object.keys(arch.children).length > 0)
    .map((arch) => ({
      name: arch.name,
      children: Object.values(arch.children).filter(
        (series) => series.children.length > 0
      ),
    }));

  return {
    name: "NVIDIA GPUs",
    children: filteredArchitectures,
  };
};

// FilterPanel Component
const FilterPanel = ({ filters, setFilters, uniqueValues, onSearchChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === "All" ? "" : value,
    }));
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-xl text-white">
      <h3 className="text-xl font-semibold mb-4 text-orange-400">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-300"
          >
            Search GPU
          </label>
          <input
            type="text"
            id="search"
            placeholder="e.g., RTX 4090"
            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm bg-gray-700 text-white focus:ring-orange-500 focus:border-orange-500 p-2"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="purpose"
            className="block text-sm font-medium text-gray-300"
          >
            Purpose
          </label>
          <select
            id="purpose"
            name="purpose"
            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm bg-gray-700 text-white focus:ring-orange-500 focus:border-orange-500 p-2"
            value={filters.purpose}
            onChange={handleChange}
          >
            <option value="">All</option>
            {uniqueValues.purposes.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-300"
          >
            Type
          </label>
          <select
            id="type"
            name="type"
            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm bg-gray-700 text-white focus:ring-orange-500 focus:border-orange-500 p-2"
            value={filters.type}
            onChange={handleChange}
          >
            <option value="">All</option>
            {uniqueValues.types.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="architecture"
            className="block text-sm font-medium text-gray-300"
          >
            Architecture
          </label>
          <select
            id="architecture"
            name="architecture"
            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm bg-gray-700 text-white focus:ring-orange-500 focus:border-orange-500 p-2"
            value={filters.architecture}
            onChange={handleChange}
          >
            <option value="">All</option>
            {uniqueValues.architectures.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="series"
            className="block text-sm font-medium text-gray-300"
          >
            Series
          </label>
          <select
            id="series"
            name="series"
            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm bg-gray-700 text-white focus:ring-orange-500 focus:border-orange-500 p-2"
            value={filters.series}
            onChange={handleChange}
          >
            <option value="">All</option>
            {uniqueValues.series.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="useCase"
            className="block text-sm font-medium text-gray-300"
          >
            Use Case
          </label>
          <select
            id="useCase"
            name="useCase"
            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm bg-gray-700 text-white focus:ring-orange-500 focus:border-orange-500 p-2"
            value={filters.useCase}
            onChange={handleChange}
          >
            <option value="">All</option>
            {uniqueValues.useCases.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

// TimelineView Component (using D3.js)
const TimelineView = ({ data, onSelectGpu, selectedGpu }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width =
      svgRef.current.parentElement.clientWidth - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    svg.selectAll("*").remove(); // Clear previous render

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Sort data by release date
    const sortedData = [...data].sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date)
    );

    // Get unique series for Y-axis, only from the current filtered data
    const uniqueSeries = [...new Set(sortedData.map((d) => d.series))].sort();

    const x = d3
      .scaleTime()
      .domain(d3.extent(sortedData, (d) => new Date(d.release_date)))
      .range([0, width]);

    const y = d3
      .scalePoint()
      .domain(uniqueSeries) // Use unique series from filtered data
      .range([0, height])
      .padding(0.5);

    // X-axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("fill", "#ccc");

    // Y-axis (series labels)
    g.append("g").call(d3.axisLeft(y)).selectAll("text").attr("fill", "#ccc");

    // Circles for GPUs
    g.selectAll("circle")
      .data(sortedData)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(new Date(d.release_date)))
      .attr("cy", (d) => y(d.series))
      .attr("r", 8)
      .attr("fill", (d) =>
        selectedGpu && selectedGpu.id === d.id ? "#FEA500" : "#6366F1"
      ) // Highlight selected
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1.5)
      .style("cursor", "pointer")
      .on("click", (event, d) => onSelectGpu(d))
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 10)
          .attr("fill", "#FEA500");
        g.append("text")
          .attr("class", "timeline-tooltip")
          .attr("x", x(new Date(d.release_date)) + 10)
          .attr("y", y(d.series) - 10)
          .text(`${d.name} (${new Date(d.release_date).getFullYear()})`)
          .attr("fill", "#fff")
          .attr("font-size", "12px");
      })
      .on("mouseout", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 8)
          .attr(
            "fill",
            selectedGpu && selectedGpu.id === d.id ? "#FEA500" : "#6366F1"
          );
        g.selectAll(".timeline-tooltip").remove();
      });
  }, [data, onSelectGpu, selectedGpu]); // Reruns when 'data' changes

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-xl mb-6">
      <h2 className="text-2xl font-bold mb-4 text-orange-400">
        GPU Release Timeline
      </h2>
      <div className="overflow-x-auto">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

// HierarchyView Component (using D3.js)
const HierarchyView = ({ data, onSelectGpu, selectedGpu }) => {
  // Now accepts 'data' prop
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 90, bottom: 30, left: 90 };
    // Calculate a dynamic width based on the number of architecture/series levels
    // This helps in preventing content cutoff and makes the scrollbar useful
    const dynamicWidth = Math.max(
      svgRef.current.parentElement.clientWidth - margin.left - margin.right, // Minimum width
      data.length * 150 // Adjust multiplier as needed for tree density
    );
    const height = 600 - margin.top - margin.bottom;

    svg.selectAll("*").remove(); // Clear previous render

    svg
      .attr("width", dynamicWidth + margin.left + margin.right) // Set dynamic width
      .attr("height", height + margin.top + margin.bottom);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Use dynamicWidth for the tree layout
    const treeLayout = d3.tree().size([height, dynamicWidth]);

    // Create hierarchy data based on the *passed in* 'data'
    const hierarchyRootData = createHierarchyData(data); // Use the data prop here
    const root = d3.hierarchy(hierarchyRootData);
    treeLayout(root);

    // Links
    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      )
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-width", 1.5);

    // Nodes
    const node = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr(
        "class",
        (d) => `node ${d.children ? "node--internal" : "node--leaf"}`
      )
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node
      .append("circle")
      .attr("r", 6)
      .attr("fill", (d) =>
        selectedGpu && d.data.id === selectedGpu.id
          ? "#FEA500"
          : d.children
          ? "#6366F1"
          : "#818CF8"
      )
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1.5)
      .style("cursor", (d) => (d.data.id ? "pointer" : "default"))
      .on("click", (event, d) => {
        if (d.data.id) {
          onSelectGpu(d.data.data); // Pass the actual GPU data
        }
      });

    node
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.children ? -10 : 10))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name)
      .attr("fill", "#ccc")
      .attr("font-size", "12px");
  }, [data, onSelectGpu, selectedGpu]); // Reruns when 'data' changes

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-xl mb-6">
      <h2 className="text-2xl font-bold mb-4 text-orange-400">GPU Hierarchy</h2>
      {/* Added Tailwind class 'overflow-x-auto' here */}
      <div className="overflow-x-auto">
        <svg ref={svgRef} className="min-w-full"></svg>{" "}
        {/* Ensure SVG can take full width for scrolling */}
      </div>
    </div>
  );
};

// DetailPanel Component
const DetailPanel = ({ gpu }) => {
  if (!gpu) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg shadow-xl text-white flex justify-center items-center h-full">
        <p className="text-xl text-gray-400">
          Select a GPU from the timeline or hierarchy to see details.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl text-white">
      <h2 className="text-3xl font-bold mb-4 text-orange-400">{gpu.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-indigo-400">
            General Information
          </h3>
          <p>
            <span className="font-medium">Series:</span> {gpu.series}
          </p>
          <p>
            <span className="font-medium">Architecture:</span>{" "}
            {gpu.architecture}
          </p>
          <p>
            <span className="font-medium">Release Date:</span>{" "}
            {gpu.release_date}
          </p>
          <p>
            <span className="font-medium">Type:</span> {gpu.type}
          </p>
          <p>
            <span className="font-medium">Purpose:</span> {gpu.purpose}
          </p>{" "}
          {/* Display new purpose field */}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-indigo-400">
            Key Specifications
          </h3>
          <p>
            <span className="font-medium">CUDA Cores:</span>{" "}
            {gpu.specifications.cuda_cores}
          </p>
          {gpu.specifications.tensor_cores && (
            <p>
              <span className="font-medium">Tensor Cores:</span>{" "}
              {gpu.specifications.tensor_cores}
            </p>
          )}
          {gpu.specifications.rt_cores && (
            <p>
              <span className="font-medium">RT Cores:</span>{" "}
              {gpu.specifications.rt_cores}
            </p>
          )}
          <p>
            <span className="font-medium">VRAM:</span>{" "}
            {gpu.specifications.vram_gb}GB {gpu.specifications.vram_type}
          </p>
          <p>
            <span className="font-medium">Memory Bus:</span>{" "}
            {gpu.specifications.memory_bus_bit}-bit
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-indigo-400">
          Power Consumption
        </h3>
        <p>
          <span className="font-medium">TDP:</span>{" "}
          {gpu.power_consumption.tdp_watts}W
        </p>
        <p>
          <span className="font-medium">Typical Usage:</span>{" "}
          {gpu.power_consumption.typical_watts}W
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-indigo-400">
          Use Cases
        </h3>
        <ul className="list-disc list-inside">
          {gpu.use_cases.map((useCase, index) => (
            <li key={index}>{useCase}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function App() {
  const [selectedGpu, setSelectedGpu] = useState(null);
  const [filters, setFilters] = useState({
    purpose: "", // New filter state
    type: "",
    architecture: "",
    series: "",
    useCase: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const uniqueValues = {
    purposes: [...new Set(gpuData.map((gpu) => gpu.purpose))].sort(), // Added unique purposes
    types: getUniqueValues("type"),
    architectures: getUniqueValues("architecture"),
    series: getUniqueValues("series"),
    useCases: [...new Set(gpuData.flatMap((gpu) => gpu.use_cases))].sort(),
  };

  const filteredGpus = gpuData.filter((gpu) => {
    const matchesSearch =
      searchTerm === "" ||
      gpu.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPurpose =
      filters.purpose === "" || gpu.purpose === filters.purpose; // New filter logic
    const matchesType = filters.type === "" || gpu.type === filters.type;
    const matchesArchitecture =
      filters.architecture === "" || gpu.architecture === filters.architecture;
    const matchesSeries =
      filters.series === "" || gpu.series === filters.series;
    const matchesUseCase =
      filters.useCase === "" || gpu.use_cases.includes(filters.useCase);
    return (
      matchesSearch &&
      matchesPurpose &&
      matchesType &&
      matchesArchitecture &&
      matchesSeries &&
      matchesUseCase
    ); // Combined filters
  });

  return (
    <div className="min-h-screen bg-gray-900 font-inter text-gray-300 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-green-400 mb-8 tracking-wide">
          NVIDIA GPU Explorer
        </h1>

        {/* Filter Panel */}
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          uniqueValues={uniqueValues}
          onSearchChange={setSearchTerm}
        />

        {/* Main Content Area */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline and Hierarchy Views */}
          <div className="lg:col-span-2">
            <TimelineView
              data={filteredGpus}
              onSelectGpu={setSelectedGpu}
              selectedGpu={selectedGpu}
            />
            {/* Pass filteredGpus to HierarchyView */}
            <HierarchyView
              data={filteredGpus}
              onSelectGpu={setSelectedGpu}
              selectedGpu={selectedGpu}
            />
          </div>

          {/* Detailed View */}
          <div className="lg:col-span-1">
            <DetailPanel gpu={selectedGpu} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
