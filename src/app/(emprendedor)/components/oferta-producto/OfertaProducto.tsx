import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Typography, TextField, Box, IconButton, Grid2, CircularProgress } from '@mui/material';
import { Close } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { themePalette } from '@/config/theme.config';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter,useGridApiRef } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { Edit, Delete } from '@mui/icons-material';
import { red } from '@mui/material/colors';


dayjs.locale('es'); 

interface Producto {
  id: string;
  name: string;
  finalPrice: string;
}

interface Oferta {
  id: string;
  productName: string;
  originalPrice: string;
  discountedPrice: string;
  discountPercentage: string;
  startDate: string;
  endDate: string;
  status:string;
}

interface OfertaProductoProps {
  open: boolean;
  onClose: () => void;
}



const OfertaProducto: React.FC<OfertaProductoProps> = ({ open, onClose }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [precioActual, setPrecioActual] = useState<number>(0);
  const [precioConDescuento, setPrecioConDescuento] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);  // Nuevo estado para carga
  const [successMessage, setSuccessMessage] = useState<string>('');  // Nuevo estado para el mensaje de éxito
  const { control, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const porcentajeDescuento = watch('porcentajeDescuento');
  const startDate = watch('startDate');  
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [loadingOfertas, setLoadingOfertas] = useState<boolean>(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState<string | null>(null);
  const apiRef = useGridApiRef(); 
  const entrepreneurId = '9d4d342e-aca0-4c88-868e-c86e2fb9b793';

  useEffect(() => {
    axios.get(`http://localhost:3001/api/products/entrepreneur/${entrepreneurId}`)
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener productos:', error);
      });
  }, [entrepreneurId]);

  useEffect(() => {
    if (open) {
      console.log("Cargando ofertas...");
      setLoadingOfertas(true);
      axios.get(`http://localhost:3001/api/offers/entrepreneur/${entrepreneurId}`)
        .then((response) => {
          if (response.data.status === 'success') {
            setOfertas(response.data.data);
          }
        })
        .catch((error) => {
          console.error('Error al obtener ofertas:', error);
        })
        .finally(() => {
          setLoadingOfertas(false);
        });
    }
  }, [open]);

  const handleDeleteOffer = (offerId: string) => {
    setOfferToDelete(offerId);
    setOpenDeleteDialog(true);
  };
  
  const confirmDeleteOffer = async () => {
    if (!offerToDelete) return;
  
    try {
      const response = await axios.delete(`http://localhost:3001/api/offers/${offerToDelete}`);
  
      if (response.data.status === 'success') {
        apiRef.current.setRowSelectionModel([]); // Limpia la selección de la tabla
  
        setOfertas((prevOfertas) => prevOfertas.filter((oferta) => oferta.id !== offerToDelete));
        console.log('Oferta eliminada:', response.data);
      }
    } catch (error) {
      console.error('Error al eliminar la oferta:', error);
    } finally {
      setOpenDeleteDialog(false);
      setOfferToDelete(null);
    }
  };
  

  const traducirEstatus = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Pendiente';
      case 'ACTIVE': return 'Activo';
      case 'DELETED': return 'Eliminado';
      default: return 'Desconocido';
    }
  };

  const obtenerColorEstatus = (status: string) => {
    switch (status) {
      case 'PENDING': return 'orange';
      case 'ACTIVE': return 'green';
      case 'DELETED': return 'red';
      default: return 'gray';
    }
  };

  const columns: GridColDef[] = [
    { field: 'productName', headerName: 'Producto', minWidth: 150, flex: 1 },
    {
      field: 'startDate',
      headerName: 'Fecha Inicio',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        console.log("Valor recibido en startDate:", params.row.startDate);
        return params.row.startDate ? dayjs(params.row.startDate).format('DD/MM/YYYY') : 'Sin fecha';
      },
    },
    {
      field: 'endDate',
      headerName: 'Fecha Fin',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        console.log("Valor recibido en endDate:", params.row.endDate);
        return params.row.endDate ? dayjs(params.row.endDate).format('DD/MM/YYYY') : 'Sin fecha';
      },
    },
    
    { field: 'originalPrice', headerName: 'Precio', minWidth: 100, flex: 0.75 },
    { field: 'discountPercentage', headerName: 'Descuento (%)', minWidth: 150, flex: 1 },
    { field: 'discountedPrice', headerName: 'Precio Promoción', minWidth: 150, flex: 1 },
    { 
      field: 'status', 
      headerName: 'Estatus', 
      minWidth: 120, 
      flex: 0.75,
      renderCell: (params) => (
        <Box 
          sx={{  
            fontSize: '14px', // Mismo tamaño que otras columnas
            fontFamily: 'inherit', // Hereda la tipografía general
            fontWeight: 'normal', // Evita que sea más gruesa
            color: obtenerColorEstatus(params.value),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%', // Asegura que ocupe toda la celda
            height: '100%',
          }}
        >
          {traducirEstatus(params.value)}
        </Box>
      ),
    },
    {
      field: 'editar',
      headerName: 'Editar',
      minWidth: 90,
      flex: 0.5,
      renderCell: () => (
        <IconButton sx={{ color: themePalette.primary }}>
          <Edit />
        </IconButton>
      ),
    },
    {
      field: 'eliminar',
      headerName: 'Eliminar',
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => handleDeleteOffer(params.row.id)}>
          <Delete />
        </IconButton>
      ),
    },
    
  ];

  useEffect(() => {
    if (porcentajeDescuento && precioActual) {
      const descuento = (precioActual * porcentajeDescuento) / 100;
      setPrecioConDescuento(precioActual - descuento);
    }
  }, [porcentajeDescuento, precioActual]);

  const onSubmit = async (data: any) => {
    setLoading(true);  // Iniciar la carga
  
    const formattedStartDate = dayjs(data.startDate).toISOString();
    const formattedEndDate = dayjs(data.endDate).toISOString();
    const ofertaData = {
      productId: selectedProduct?.id,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      discountPercentage: Number(data.porcentajeDescuento),
      entrepreneurId,
    };
  
    try {
      const response = await axios.post('http://localhost:3001/api/offers/', ofertaData);
      
      if (response.data.status === 'success') {
        console.log('Oferta creada con éxito:', response.data);
  
        // Agregar la nueva oferta a la tabla sin recargar
        setOfertas((prevOfertas) => [
          ...prevOfertas, 
          {
            id: response.data.data.id,
            productName: selectedProduct?.name || 'Desconocido',
            originalPrice: precioActual.toFixed(2),
            discountedPrice: precioConDescuento.toFixed(2),
            discountPercentage: data.porcentajeDescuento,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            status: 'PENDING' // Estado inicial
          }
        ]);
  
        setSuccessMessage('¡Oferta guardada exitosamente!');
  
        // Limpiar los campos después de guardar la oferta
        reset({
          startDate: null,
          endDate: null,
          porcentajeDescuento: '',
        });
        setSelectedProduct(null);
        setPrecioActual(0);
        setPrecioConDescuento(0);
      }
    } catch (error) {
      console.error('Error al crear la oferta:', error);
      setSuccessMessage('Hubo un error al guardar la oferta.');
    } finally {
      setLoading(false);
    }
  };

  
  const handleCancel = () => {
    // Limpiar los campos al cancelar
    reset({
      startDate: null,
      endDate: null,
      porcentajeDescuento: '',
    });
    setSelectedProduct(null);  // Limpiar la selección del producto
    setPrecioActual(0);
    setPrecioConDescuento(0);
    setSuccessMessage('');  // Limpiar el mensaje de éxito o error
    onClose();
  };

  const CustomToolbar = () => (
    <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </div>
      <GridToolbarQuickFilter debounceMs={500} sx={{ marginLeft: 'auto' }} />
    </GridToolbarContainer>
  );

  return (
    <>
    
<Dialog
  open={openDeleteDialog}
  onClose={() => setOpenDeleteDialog(false)}
  maxWidth="xs"
  fullWidth
>
  <DialogTitle
    sx={{
      backgroundColor: themePalette.primary,
      color: themePalette.cwhite,
      textAlign: 'center',
      fontWeight: 'bold',
    }}
  >
    Confirmar Eliminación
  </DialogTitle>
  <DialogContent dividers>
    <Typography sx={{ fontSize: '18px', textAlign: 'center', color: themePalette.black }}>
      ¿Estás seguro de que deseas eliminar esta oferta? Esta acción no se puede deshacer.
    </Typography>
    <Box display="flex" justifyContent="center" gap={2} mt={3}>
      <Button
        onClick={() => setOpenDeleteDialog(false)}
        variant="contained"
        sx={{
          textTransform: "none",
          width: "120px",
          background: themePalette.black10,
          color: themePalette.black,
          "&:hover": { background: themePalette.secondary },
        }}
      >
        Cancelar
      </Button>
      <Button
        onClick={confirmDeleteOffer}
        variant="contained"
        color="error"
        sx={{
          textTransform: "none",
          width: "120px",
          background: themePalette.black10,
          color: themePalette.black,
          "&:hover": { background: "red" },
        }}
      >
        Eliminar
      </Button>
    </Box>
  </DialogContent>
</Dialog>

   
    <Dialog open={open} onClose={handleCancel} maxWidth="xl" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: themePalette.primary,
          color: themePalette.cwhite,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: '36px', textAlign: 'center' }}>
          Lista de ofertas
        </Typography>
        <IconButton
          onClick={handleCancel}
          sx={{ color: themePalette.cwhite, position: 'absolute', right: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" alignItems="center" gap={2} justifyContent={'center'}>
            <Grid2 container spacing={2} justifyContent="left" alignItems="center">
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Typography align="left" sx={{ fontSize: '24px', fontWeight: '600', color: themePalette.primary }}>
                  Nombre de producto:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 5 }}>
                <Autocomplete
                  options={productos}
                  value={selectedProduct}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    setSelectedProduct(newValue);
                    if (newValue) {
                      setPrecioActual(Number(newValue.finalPrice));
                    } else {
                      setPrecioActual(0);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} placeholder="Buscar" />}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Typography align="left" sx={{ fontSize: '24px', fontWeight: '600', color: themePalette.primary }}>
                  Fecha de inicio:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 8 }}>
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue={null}
                  rules={{ required: "La fecha de inicio es obligatoria" }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      format="DD/MM/YYYY"
                      minDate={dayjs().add(1, 'day')} // No permite la fecha de hoy ni pasadas
                      onChange={(date) => field.onChange(date)}
                      slotProps={{
                        textField: {
                          fullWidth: true, 
                          sx: { maxWidth: '180px' },
                          placeholder: 'DD/MM/AAAA',
                        },
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Typography align="left" sx={{ fontSize: '24px', fontWeight: '600', color: themePalette.primary }}>
                  Fecha de fin:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 8 }}>
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue={null}
                  rules={{ required: "La fecha de fin es obligatoria" }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      format="DD/MM/YYYY"
                      minDate={startDate ? dayjs(startDate).add(1, 'day') : dayjs().add(1, 'day')} // No permite fechas anteriores a la fecha de inicio ni pasadas
                      onChange={(date) => field.onChange(date)}
                      slotProps={{
                        textField: {
                          fullWidth: true, 
                          sx: { maxWidth: '180px' },
                          placeholder: 'DD/MM/AAAA',
                        },
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Typography align="left" sx={{ fontSize: '24px', fontWeight: '600', color: themePalette.primary }}>
                  Precio actual:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 8 }}>
                <TextField
                  value={`$${precioActual}`}
                  InputProps={{ readOnly: true }}  // Solo lectura
                  fullWidth
                  sx={{ maxWidth: '100px' }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Typography align="left" sx={{ fontSize: '24px', fontWeight: '600', color: themePalette.primary }}>
                  Porcentaje de descuento:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 8 }}>
                <Controller
                  name="porcentajeDescuento"
                  control={control}
                  defaultValue={''}
                  rules={{
                    required: "El porcentaje de descuento es obligatorio",
                    pattern: {
                      value: /^[1-9]$|^[1-9][0-9]$/, // Solo números enteros entre 1 y 99
                      message: "El valor debe ser un número entero entre 1 y 99"
                    },
                    validate: value => {
                      if (value < 1 || value > 99) {
                        return "El valor debe estar entre 1 y 99";
                      }
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
                      fullWidth
                      sx={{ maxWidth: '110px' }}
                      value={field.value || ''}
                      inputProps={{
                        min: 1,
                        max: 99,  // Máximo 99
                        step: 1,  // Solo permite números enteros
                      }}
                      onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        // Permitir solo números y evitar caracteres no válidos
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();  // Prevenir la tecla si no es un número
                        }
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Typography align="left" sx={{ fontSize: '24px', fontWeight: '600', color: themePalette.primary }}>
                  Precio con descuento:
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 8 }}>
                <TextField
                  value={`$${precioConDescuento.toFixed(2)}`}
                  InputProps={{ readOnly: true }}  // Solo lectura
                  fullWidth
                  sx={{ maxWidth: '100px' }}
                />
              </Grid2>
            </Grid2>
            <Box display="flex" justifyContent="space-between" gap={2} mt={2} paddingBottom={5}>
              <Button 
                variant="contained" 
                type="submit" 
                sx={{
                                  textTransform: "none",
                                  width: "213px",
                                  height: "34px",
                                  borderRadius: "20px",
                                  fontSize: "18px",
                                  background: themePalette.primary,
                                }}>
                {loading ? <CircularProgress size={24} sx={{ color: themePalette.cwhite }} /> : 'Guardar'}
              </Button>
              <Button 
                onClick={handleCancel} 
                variant="contained" 
                sx={{
                  textTransform: "none",
                  width: "213px",
                  height: "34px",
                  borderRadius: "20px",
                  fontSize: "18px",
                  background: themePalette.primary,
                }}
              >
                Cancelar
              </Button>
            </Box>
            {successMessage && (
              <Typography sx={{ marginTop: '16px', textAlign: 'center', color: 'green', fontWeight: 'bold' }}>
                {successMessage}
              </Typography>
            )}
          </Box>
          <DialogContent dividers>
        <Box sx={{ height: 400, width: '100%', paddingTop:'10px' }}>
          {loadingOfertas ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
            key={ofertas.length} // Clave dinámica para forzar re-render cuando se quede vacío
            apiRef={apiRef}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            columns={columns}
            rows={ofertas.length > 0 ? ofertas : []} // Garantiza que nunca sea undefined
            getRowId={(row) => row.id}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            pageSizeOptions={[5, 10, 25]}
            slots={{ toolbar: CustomToolbar }}
            sx={{
              '& .MuiDataGrid-toolbarContainer': {
                backgroundColor: themePalette.cwhite,
                padding: '0.20rem',
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: themePalette.black10,
                fontWeight: 'bold',
                fontSize: '16px', 
                textAlign: 'center',
              },
              '& .MuiDataGrid-cell': {
                fontSize: '14px',  
                alignItems: 'center',
                justifyContent: 'center',
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: themePalette.black10,
                fontWeight: 'bold',
                fontSize: '14px',  
                alignItems: 'center',
                justifyContent: 'center',
              },
              '& .MuiDataGrid-columnHeaders': {
                textAlign: 'center',
              },
            }}
          />
          
          
          )}
        </Box>
      </DialogContent>
          
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default OfertaProducto;
