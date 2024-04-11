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
                    padding: "1rem 4rem",
                    borderRadius: "1rem",
                    margin: "auto",
                    marginTop: "1rem",
                    width: "100%",
                    overflow: "hidden",
                    height: "100%",
                    boxShadow: "none",
                    backgroundColor: "black",
                    color: "white"
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