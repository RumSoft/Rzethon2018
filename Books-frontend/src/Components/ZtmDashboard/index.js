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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ZtmService } from "../../Services";

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

export default class ZtmDashboard extends React.Component {
  state = {
    buses: []
  };

  async loadData() {
    await ZtmService.getBuses().then(x => {
      return this.setState({
        buses: x.data.data,
        loaded: true
      });
    });
    console.log(this.state.buses);
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
          <Grid container spacing={24}>
            <Grid item xs={12} md={7}>
              <Paper className="paper">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nr Autobusu</TableCell>
                      <TableCell>Nazwa urządzenia</TableCell>
                      <TableCell>Przeczytano dzisiaj</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.buses.map(x => {
                      return (
                        <TableRow key={x._id}>
                          <TableCell component="th" scope="row">
                            {x.line}
                          </TableCell>
                          <TableCell numeric>{x.beaconsTagName}</TableCell>
                          <TableCell numeric>{x.readingUsersToday}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}
