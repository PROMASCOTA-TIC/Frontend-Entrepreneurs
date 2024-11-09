'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { esES } from '@mui/x-data-grid/locales';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { themePalette } from '@/config/theme.config';

interface Row {
    id: number;
    fecha: string;
    detalle: string;
    montoVenta: number;
}

const Comision = 0.1;

function ccyFormat(num: number) {
    return `${(num ?? 0).toFixed(2)}`;
}

function createRow(id: number, fecha: string, detalle: string, montoVenta: number): Row {
    return { id, fecha, detalle, montoVenta };
}

function subtotal(items: readonly Row[]) {
    return items.map(({ montoVenta }) => montoVenta).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow(
        1,
        new Date("2024-08-31T00:00:00").toLocaleDateString('es-ES',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }),
        'Venta de producto A',
        100.00
    ),
    createRow(
        2,
        new Date("2024-09-01T00:00:00").toLocaleDateString('es-ES',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }),
        'Venta de producto B',
        45.99
    ),
    createRow(
        3,
        new Date("2024-09-02T00:00:00").toLocaleDateString('es-ES',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }),
        'Venta de producto C',
        17.99
    ),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = Comision * invoiceSubtotal;
const invoiceTotal = invoiceSubtotal - invoiceTaxes;

const columns: GridColDef[] = [
    { field: 'id', headerName: 'No', flex: 0.2, headerAlign: 'center', align: 'center' },
    { field: 'fecha', headerName: 'Fecha', type: 'number', flex: 0.5, headerAlign: 'center', align: 'center' },
    { field: 'detalle', headerName: 'Detalle', type: 'number', flex: 1, headerAlign: 'center', align: 'center' },
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
                        }}
                    />
                </Box>
            </Box>
            <Box className="flex flex-col items-center">
                <Box className="flex flex-col justify-end items-end"
                    sx={{
                        width: { xs: '90%', sm: '70%', md: '60%' },
                    }}
                >
                    <Box sx={{ padding: '1rem', backgroundColor: themePalette.cwhite, width: { xs: '50%', md: '40%' } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>Subtotal:</Typography>
                            <Typography>${ccyFormat(invoiceSubtotal)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>Comisión ({(Comision * 100).toFixed(0)}%):</Typography>
                            <Typography>${ccyFormat(invoiceTaxes)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>Total a pagar:</Typography>
                            <Typography>${ccyFormat(invoiceTotal)}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
