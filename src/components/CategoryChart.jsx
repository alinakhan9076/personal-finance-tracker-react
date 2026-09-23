import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#2E5E8C",
    "#2E7D32",
    "#B76E00",
    "#9B2226",
    "#5A4FCF",
];

function CategoryChart({ summary }) {
    const data = summary.map((row) => ({
        name: row._id,
        value: row.total / 100,
    }));

    return (
        <ResponsiveContainer width="100%"
        height={300} >
            <PieChart>
                <Pie data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label>

                    {data.map((entry, index) => (
                        <Cell key={index}
                        fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>

                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default CategoryChart;