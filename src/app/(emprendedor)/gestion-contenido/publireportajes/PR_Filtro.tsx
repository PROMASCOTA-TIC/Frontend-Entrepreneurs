import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function PR_Filtro() {
    const [subCategoria, setSubCategoria] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSubCategoria(event.target.value);
    };

    return (
        <div>
            <div style= {{ display: 'flex', justifyContent: 'flex-end', padding: '34px 34px 0px 0px'}}>
                <FormControl sx={{ minWidth: '250px' }} size="small">
                    <InputLabel id="demo-simple-select-autowidth-label" >Seleccione la categoría</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={subCategoria}
                        onChange={handleChange}
                        autoWidth
                        label="subcategoria"
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#004040',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#004040',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#004040',
                            },
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={0}>Nuevos Productos</MenuItem>
                        <MenuItem value={1}>Nuevos Servicios</MenuItem>
                        <MenuItem value={2}>Eventos</MenuItem>
                        <MenuItem value={3}>Ofertas</MenuItem>
                        <MenuItem value={3}>Innovación y Tecnología</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}