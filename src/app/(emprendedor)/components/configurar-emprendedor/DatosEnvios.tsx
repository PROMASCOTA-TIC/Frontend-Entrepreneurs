"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  Checkbox,
  TextField,
  MenuItem,
  FormControlLabel,
  Typography,
  Alert,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { themePalette } from "@/config/theme.config";
import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import { URL_BASE } from "@/config/config";


const API_GET = `${URL_BASE}users/entrepreneurs`;
const API_PATCH = `${URL_BASE}users/update-entrepreneur`;


const apiKey = process.env.NEXT_PUBLIC_API_KEY;

type Inputs = {
  realizaEnvios: string;
  soloRetiraEnTienda: string;
  callePrincipal: string;
  calleSecundaria: string;
  numeracion: string;
  referencia: string;
  sectorLocal: string;
};


const zonas = [
    {
        nombre: "Norte-1",
        color: "black",
        path: [
            { lat: -0.0369258, lng: -78.4567455 },
            { lat: -0.0367541, lng: -78.4358029 },
            { lat: 0.0210958, lng: -78.4249882 },
            { lat: 0.0228124, lng: -78.4562306 },
            { lat: 0.014401, lng: -78.4687618 },
            { lat: 0.0049596, lng: -78.4711651 },
            { lat: -0.0019069, lng: -78.4639553 },
            { lat: -0.0132365, lng: -78.4572605 },
            { lat: -0.0245662, lng: -78.4548573 },
            { lat: -0.0369258, lng: -78.4567455 }
        ]
    },
    {
        nombre: "Centro",
        color: "orange",
        path: [
            { lat: -0.179561, lng: -78.5249374 },
            { lat: -0.2185585, lng: -78.534955 },
            { lat: -0.2427626, lng: -78.5171022 },
            { lat: -0.2455091, lng: -78.5013094 },
            { lat: -0.2171853, lng: -78.4779635 },
            { lat: -0.1989893, lng: -78.4630289 },
            { lat: -0.1843981, lng: -78.4731569 },
            { lat: -0.1902039, lng: -78.4756706 },
            { lat: -0.179561, lng: -78.5249374 }
        ]
    },
    {
        nombre: "Sur",
        color: "lightblue",
        path: [
            { lat: -0.2185585, lng: -78.534955 },
            { lat: -0.2801331, lng: -78.584337 },
            { lat: -0.3738586, lng: -78.5743806 },
            { lat: -0.3549763, lng: -78.5091493 },
            { lat: -0.2455091, lng: -78.5013094 },
            { lat: -0.2427626, lng: -78.5171022 },
            { lat: -0.2185585, lng: -78.534955 }
        ]
    },
    {
        nombre: "Norte-2",
        color: "green",
        path: [
            { lat: -0.0369258, lng: -78.4567455 },
            { lat: -0.0395007, lng: -78.4880711 },
            { lat: -0.0412173, lng: -78.5162236 },
            { lat: -0.0666232, lng: -78.5340764 },
            { lat: -0.1033587, lng: -78.5381962 },
            { lat: -0.1153749, lng: -78.5278966 },
            { lat: -0.1366609, lng: -78.5272099 },
            { lat: -0.1503938, lng: -78.513477 },
            { lat: -0.1682465, lng: -78.5042073 },
            { lat: -0.179561, lng: -78.5249374 },
            { lat: -0.1902039, lng: -78.4756706 },
            { lat: -0.1721947, lng: -78.4695317 },
            { lat: -0.154342, lng: -78.465326 },
            { lat: -0.1502221, lng: -78.4519364 },
            { lat: -0.1536553, lng: -78.4294488 },
            { lat: -0.1344293, lng: -78.4155442 },
            { lat: -0.1045603, lng: -78.4119393 },
            { lat: -0.0798411, lng: -78.4327103 },
            { lat: -0.0367541, lng: -78.4358029 },
            { lat: -0.0369258, lng: -78.4567455 }
        ]
    },
    {
        nombre: "Valle Sangolqui",
        color: "yellow",
        path: [
            { lat: -0.1989893, lng: -78.4630289 },
            { lat: -0.2455091, lng: -78.5013094 },
            { lat: -0.3549763, lng: -78.5091493 },
            { lat: -0.3845996, lng: -78.4544265 },
            { lat: -0.349183, lng: -78.4168963 },
            { lat: -0.3134781, lng: -78.3842806 },
            { lat: -0.2678167, lng: -78.4405856 },
            { lat: -0.2441277, lng: -78.4728579 },
            { lat: -0.202586, lng: -78.4550051 },
            { lat: -0.1989893, lng: -78.4630289 }
        ]
    },
    {
        nombre: "Valle Cumbaya",
        color: "purple",
        path: [
            { lat: -0.1536553, lng: -78.4294488 },
            { lat: -0.1502221, lng: -78.4519364 },
            { lat: -0.154342, lng: -78.465326 },
            { lat: -0.1840233, lng: -78.4735545 },
            { lat: -0.1989893, lng: -78.4630289 },
            { lat: -0.202586, lng: -78.4550051 },
            { lat: -0.2186987, lng: -78.4611519 },
            { lat: -0.2380962, lng: -78.4481057 },
            { lat: -0.2243634, lng: -78.4263047 },
            { lat: -0.2329464, lng: -78.3720597 },
            { lat: -0.2394695, lng: -78.3289727 },
            { lat: -0.2315732, lng: -78.3133515 },
            { lat: -0.1467729, lng: -78.3626183 },
            { lat: -0.1536553, lng: -78.4294488 }
        ]
    }
];


const containerStyle = { width: "100%", height: "300px" };
const center = { lat: -0.180653, lng: -78.467834 };

export const CambioDatosEnvio: React.FC = () => {
  const router = useRouter();
  const [entrepreneurId, setEntrepreneurId] = useState<string | null>(null);
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: apiKey || "" });

  const { control, handleSubmit, setValue, watch, formState: { errors }}= useForm<Inputs>({
    defaultValues: {
      realizaEnvios: "0",
      soloRetiraEnTienda: "0",
      callePrincipal: "",
      calleSecundaria: "",
      numeracion: "",
      referencia: "",
      sectorLocal: "",
    },
  });
  

  const [zonaSeleccionada, setZonaSeleccionada] = useState<string | null>(null);
  const [errorCheckboxes, setErrorCheckboxes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  // ✅ Obtener el ID del emprendedor desde localStorage
  useEffect(() => {
    const storedEntrepreneurId = localStorage.getItem("entrepreneur_id");
    if (storedEntrepreneurId) {
      setEntrepreneurId(storedEntrepreneurId);
    } else {
      console.warn("⚠️ No se encontró el ID del emprendedor en localStorage.");
      setErrorMsg("No se encontró el ID del emprendedor. Por favor, inicia sesión nuevamente.");
    }
  }, []);


  useEffect(() => {
    const fetchData = async () => {

      if (!entrepreneurId) return;

      try {
        const response = await fetch(`${API_GET}/${entrepreneurId}`);
        if (!response.ok) throw new Error("Error al obtener datos");

        const data = await response.json();


        setValue("realizaEnvios", data.realizaEnvios ? "1" : "0");
        setValue("soloRetiraEnTienda", data.soloRetiraEnTienda ? "1" : "0");
        setValue("callePrincipal", data.callePrincipal);
        setValue("calleSecundaria", data.calleSecundaria);
        setValue("numeracion", data.numeracion);
        setValue("referencia", data.referencia);
        setValue("sectorLocal", data.localSector || "");
      } catch (error) {
        console.error("Error cargando datos:", error);
        setErrorMsg("No se pudieron cargar los datos.");
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [entrepreneurId, setValue]);

  const validateCheckboxes = () => {
    const realizaEnvios = watch("realizaEnvios") === "1";
    const soloRetiraEnTienda = watch("soloRetiraEnTienda") === "1";

    if (!realizaEnvios && !soloRetiraEnTienda) {
      setErrorCheckboxes(true);
      return false;
    }

    setErrorCheckboxes(false);
    return true;
  };



 const onSubmit = async (data: Inputs) => {
    if (!validateCheckboxes()) return;

    setLoading(true);
    setSuccessMessage(null);

    try {
      await fetch(`${API_PATCH}/${entrepreneurId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setSuccessMessage("Los datos se han actualizado correctamente.");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Hubo un error al actualizar los datos.");
    } finally {
      setLoading(false);
    }
  };

  if (!entrepreneurId) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress size={40} />
      </Box>
    );
  }
  

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, textAlign: "left", padding: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: "center" }}>
        Editar envíos y entregas
      </Typography>
      <Typography sx={{ fontSize: "16px", mb: 2, textAlign: "center" }}>
        ¿Cómo desea ofrecer la entrega de sus productos o servicios?
      </Typography>
  {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Box display="flex" justifyContent="center" gap={2}>
            <Controller
              name="realizaEnvios"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value === "1"}
                      onChange={(e) => {
                        field.onChange(e.target.checked ? "1" : "0");
                        validateCheckboxes();
                      }}
                    />
                  }
                  label="Realiza envíos a domicilio"
                />
              )}
            />
            <Controller
              name="soloRetiraEnTienda"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value === "1"}
                      onChange={(e) => {
                        field.onChange(e.target.checked ? "1" : "0");
                        validateCheckboxes();
                      }}
                    />
                  }
                  label="Solo retiro en tienda"
                />
              )}
            />
          </Box>
          {errorCheckboxes && <Alert severity="error">Debe seleccionar al menos una opción.</Alert>}
        </Box>



{["callePrincipal", "calleSecundaria", "numeracion", "referencia"].map((field) => (
  <Box key={field} sx={{ mb: 2 }}>
    <FormLabel sx={{ color: "black", fontWeight: "bold", textAlign: "left" }}>
      {field.replace(/([A-Z])/g, " $1").replace(/\b\w/g, (l) => l.toUpperCase())}
    </FormLabel>
    <Controller
      name={field as keyof Inputs}
      control={control}
      rules={{ required: "Este campo es obligatorio" }}
      render={({ field, fieldState }) => (
        <TextField
          placeholder={`Ingrese ${field.name}`}
          fullWidth
          {...field}
          error={!!fieldState.error} 
          helperText={fieldState.error?.message}
          sx={{
            mb: 1,
            "& .MuiOutlinedInput-root": { 
              borderRadius: "8px", 
              "& fieldset": { borderColor: "gray" },
              "&:hover fieldset": { borderColor: themePalette.secondary },
              "&.Mui-focused fieldset": { borderColor: themePalette.secondary }, 
            }
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <EditIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  </Box>
))}




      <FormLabel sx={{ color: "black",fontWeight: "bold", textAlign: "left" }}>Sector</FormLabel>
      <Controller
        name="sectorLocal"
        control={control}
        render={({ field }) => (
          <TextField
            select
            fullWidth
            {...field}
            onChange={(e) => {
              field.onChange(e.target.value);
              setZonaSeleccionada(e.target.value); 
            }}
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>
              Seleccione el sector de su emprendimiento
            </MenuItem>
            {zonas.map((zona) => (
              <MenuItem key={zona.nombre} value={zona.nombre}>
                {zona.nombre}
              </MenuItem>
            ))}
          </TextField>
        )}
      />


      {isLoaded && (
        <>
          <FormLabel sx={{ color: "black",fontWeight: "bold", textAlign: "left" }}>Mapa de sectorización</FormLabel>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
            {zonas.map((zona, index) => (
              <Polygon
                key={index}
                paths={zona.path}
                options={{
                  fillColor: zonaSeleccionada === zona.nombre ? "red" : zona.color,
                  fillOpacity: zonaSeleccionada === zona.nombre ? 0.5 : 0.2, 
                  strokeColor: zonaSeleccionada === zona.nombre ? "black" : zona.color, 
                  strokeWeight: zonaSeleccionada === zona.nombre ? 3 : 1, 
                }}
              />
            ))}
          </GoogleMap>
        </>
      )}

        <Box display="flex" justifyContent="center" gap={2} mt={2}   sx={{ padding: "20px 30px 30px 30px " }}>
          <Button variant="contained" onClick={() => router.push("/inicio")}  sx={{
                                                 textTransform: "none",
                                                 backgroundColor: themePalette.primary,
                                                 width: "171px",
                                                 height: "50px",
                                                 fontSize: "18px",
                                                 borderRadius: "20px"
                                               }}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit" disabled={loading}  sx={{
                                                 textTransform: "none",
                                                 backgroundColor: themePalette.primary,
                                                 width: "171px",
                                                 height: "50px",
                                                 fontSize: "18px",
                                                 borderRadius: "20px"
                                               }}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CambioDatosEnvio;
