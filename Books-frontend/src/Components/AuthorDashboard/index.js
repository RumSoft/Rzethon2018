import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { AuthorService } from "../../Services";

import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

import "./index.scss";

class TriangleBar extends React.Component {
  getPath(x, y, width, height) {
    return `M${x},${y + height}
            C${x + width / 3},${y + height} ${x + width / 2},${y +
      height / 3} ${x + width / 2}, ${y}
            C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y +
      height} ${x + width}, ${y + height}
            Z`;
  }
  render() {
    const { fill, x, y, width, height } = this.props;
    return (
      <path d={this.getPath(x, y, width, height)} stroke="none" fill={fill} />
    );
  }
}

class AuthorDashboard extends React.Component {
  state = {};

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  async loadData() {
    await AuthorService.getReaderData().then(x =>
      this.setState({
        ...x.data.data,
        loaded: true,
        booksPopularity: []
      })
    );
    await AuthorService.getBooks().then(x => {
      console.log(x.data);
      this.setState({
        booksPopularity: x.data.data.map(y => {
          return {
            title: y.title,
            M: this.getRandomInt(15) + 15,
            F: this.getRandomInt(13) + 15
          };
        })
      });
    });
  }

  componentWillMount() {
    this.loadData();
  }

  render() {
    const colors = [
      "#1f77b4",
      "#ff7f0e",
      "#2ca02c",
      "#d62728",
      "#9467bd",
      "#8c564b",
      "#e377c2",
      "#7f7f7f",
      "#bcbd22",
      "#17becf"
    ];
    return (
      <div className="author-dashboard">
        <main>
          {this.state.loaded ? (
            <Grid container spacing={24}>
              <Grid item xs={12} md={7}>
                <Paper className="paper">
                  <h1>
                    Ostatnie statystyki <br />
                    <small>Popularność na przestrzeni ostatnich dni</small>
                  </h1>
                  <ResponsiveContainer height={200}>
                    <AreaChart data={this.state.summaryChart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={5}>
                <Paper className="paper">
                  <h1>
                    Najlepszy czytelnik <br />
                    <small>Twoim największym fanem jest...</small>
                  </h1>
                  <ResponsiveContainer height={200}>
                    <div>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          this.state.bestReaderInfo
                            ? this.state.bestReaderInfo.image
                            : ""
                        }
                        style={{ width: 100, height: 100 }}
                      />
                      <h3>
                        {this.state.bestReaderInfo
                          ? this.state.bestReaderInfo.name
                          : ""}
                      </h3>
                    </div>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper className="paper">
                  <h1>
                    Ile osób przeczytało <br />
                    <small>Zainteresowanie wsród płci</small>
                  </h1>
                  <ResponsiveContainer height={400}>
                    <PieChart>
                      <Pie
                        data={this.state.howManyReadersChart}
                        outerRadius={80}
                        fill="#8884d8"
                        label={"asd"}
                      >
                        {this.state.howManyReadersChart.map((entry, index) => (
                          <Cell fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className="paper">
                  <h1>
                    Ile przeczytano <br />
                    <small>Ile osób przeczytało ... książek</small>
                  </h1>
                  <ResponsiveContainer height={400}>
                    <BarChart
                      data={this.state.howManyRead.map(x => ({
                        name: x.books,
                        value: x.count
                      }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Bar
                        dataKey="value"
                        fill="#8884d8"
                        shape={<TriangleBar />}
                        label={{ position: "top" }}
                      >
                        {this.state.howManyRead.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % 20]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={5}>
                <Paper className="paper">
                  <h1>
                    Popularność książek <br />
                    <small>Ile osób przeczytało książkę ...</small>
                  </h1>
                  <ResponsiveContainer height={400}>
                    <RadarChart
                      outerRadius={150}
                      data={this.state.booksPopularity}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="title" />
                      <PolarRadiusAxis
                        angle={90 / this.state.booksPopularity.length}
                      />
                      <Radar
                        name="Kobiety"
                        dataKey="F"
                        stroke="#F012BE"
                        fill="#F012BE"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="Mężczyźni"
                        dataKey="M"
                        stroke="#FF851B"
                        fill="#FF851B"
                        fillOpacity={0.6}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </main>
      </div>
    );
  }
}

export default AuthorDashboard;
