'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { esES } from '@mui/x-data-grid/locales';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { themePalette } from '@/config/theme.config';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
import { URL_BASE } from '@/config/config';

interface Row {
    id: string;
    no: number;
    fecha: string;
    orderId: string;
    montoVenta: number;
}

function ccyFormat(num: number) {
    return `${(num ?? 0).toFixed(2)}`;
}

function createRow(id: string, no: number, fecha: string, orderId: string, montoVenta: number): Row {
    return { id, no, fecha, orderId, montoVenta };
}


const columns: GridColDef[] = [
    { field: 'no', headerName: 'No', flex: 0.2, headerAlign: 'center', align: 'center' },
    { field: 'fecha', headerName: 'Fecha', type: 'number', flex: 0.5, headerAlign: 'center', align: 'center' },
    { field: 'orderId', headerName: 'Id Pedido', type: 'number', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'montoVenta', headerName: 'Monto Venta', type: 'number', flex: 0.5, headerAlign: 'center', align: 'center' },
];

const CustomToolbar = () => {
    return (
        <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <GridToolbarFilterButton />
                <GridToolbarExport />
            </div>
            <GridToolbarQuickFilter
                debounceMs={500}
                sx={{ marginLeft: 'auto' }}
            />
        </GridToolbarContainer>
    );
};

export default function ComisionPago() {

    const [entrepreneurId, setEntrepreneurId] = useState<string | null>("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ orders: [], subtotal: 0.0, totalAmount: 0.0, commission: 0, commissionValue: 0.0 });
    const [rows, setRows] = useState<Row[]>([]);

    const fetchData = async () => {
        setLoading(true);
        if (!entrepreneurId) return;

        try {
            const response = await axios.get(`${URL_BASE}transactions/user/${entrepreneurId}`);
            const paymentInfo = response.status === 200 || response.status === 201 ? response.data : { orders: [], subtotal: 0.0, totalAmount: 0.0, commission: 0, commissionValue: 0.0 };
            console.log("Payment info:", paymentInfo);
            setData(paymentInfo);
            const rowData = paymentInfo.orders.map((order: any, index: number) => {
                const id = order.orderId;
                return createRow(
                    id,
                    index + 1,
                    dayjs(order.fecha).utc().format('YYYY-MM-DD'),
                    order.orderId,
                    order.total
                );
            });
            console.log("ROWDATA", rowData)
            setRows(rowData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setData({ orders: [], subtotal: 0.0, totalAmount: 0.0, commission: 0, commissionValue: 0.0 });
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        const storedEntrepreneurId = localStorage.getItem("entrepreneur_id");
        if (storedEntrepreneurId) {
            setEntrepreneurId(storedEntrepreneurId);
        } else {
            console.warn("No se encontró el ID del emprendedor en localStorage.");
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [entrepreneurId]);


    return (
        <Box className="flex flex-col justify-center mt-e21"
            sx={{ width: '100%', height: '100%' }}
        >
            <Typography className="text-primary font-bold mt-e13 mb-e21 ms-e21"
                sx={{
                    fontSize: '26px'
                }}
            >
                Comisiones y Pagos
            </Typography>
            {loading ? (
                <Box className="flex justify-center items-center min-h-[250px]">
                    <CircularProgress size={24} />
                </Box>
            ) : (
                <Box className="flex flex-col items-center">
                    <Box
                        sx={{
                            width: { xs: '90%', sm: '70%', md: '60%' },
                        }}
                    >
                        <DataGrid
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 25]}
                            slots={{
                                toolbar: CustomToolbar,
                            }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    quickFilterProps: { debounceMs: 500 },
                                },
                            }}
                            sx={{
                                flexGrow: 1,
                                '& .MuiDataGrid-toolbarContainer': {
                                    backgroundColor: themePalette.cwhite,
                                    padding: '0.5rem',
                                    border: '0px solid',
                                },
                                '& .MuiDataGrid-columnHeader': {
                                    backgroundColor: themePalette.black10,
                                    fontWeight: 'bold',
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    backgroundColor: themePalette.black10,
                                    fontWeight: 'bold',
                                },
                                '& .MuiDataGrid-columnHeaderTitle': {
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                    </Box>
                </Box>
            )}
            <Box className="flex flex-col items-center">
                <Box className="flex flex-col justify-end items-end"
                    sx={{
                        width: { xs: '90%', sm: '70%', md: '60%' },
                    }}
                >
                    <Box sx={{ padding: '1rem', backgroundColor: themePalette.cwhite, width: { xs: '50%', md: '40%' } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>Subtotal:</Typography>
                            <Typography>${ccyFormat(data.subtotal)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>Comisión ({data.commission}%):</Typography>
                            <Typography>${ccyFormat(data.commissionValue)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>Total a pagar:</Typography>
                            <Typography>${ccyFormat(data.totalAmount)}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
