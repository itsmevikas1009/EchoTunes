import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Paper, Typography } from "@mui/material";
const matBlack = "#1F2739";

const Table = ({ rows, columns, heading, rowHeight = 60 }) => {
  return (
    <Container
      sx={{
        height: "90vh",
        width: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "0 3.5rem",
          margin: "auto",
          width: "100%",
          height: "100%",
          boxShadow: "none",
          backgroundColor: "#1a1a1a",
          color: "white",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{
            margin: "2rem",
            textTransform: "uppercase",
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{
            height: "80%",
            // overflow: "auto",
            // scrollBehavior: "smooth"
          }}
          sx={{
            border: "black",
            color: "#fff",
            ".table-header": {
              bgcolor: matBlack,
              color: "white",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
