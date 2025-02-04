"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, FormLabel, Checkbox, TextField, MenuItem, FormControlLabel } from "@mui/material";
import { themePalette } from "@/config/theme.config";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

type Inputs = {
  realizaEnvios: string;
  soloRetiraEnTienda: string;
  callePrincipal: string;
  calleSecundaria: string;
  numeracion: string;
  referencia: string;
  sectorLocal: string;
};

type ShippingDetailsFormProps = {
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<Inputs>) => void;
  formData: Partial<Inputs>;
};

const zonas = [
    {
        nombre: "Norte-1",
        color: "green",
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
        color: "red",
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

export const ShippingDetailsForm: React.FC<ShippingDetailsFormProps> = ({
  nextStep,
  prevStep,
  updateFormData,
  formData
}) => {
  const [formValues, setFormValues] = useState<Inputs>({
    realizaEnvios: formData.realizaEnvios || "0",
    soloRetiraEnTienda: formData.soloRetiraEnTienda || "0",
    callePrincipal: formData.callePrincipal || "",
    calleSecundaria: formData.calleSecundaria || "",
    numeracion: formData.numeracion || "",
    referencia: formData.referencia || "",
    sectorLocal: formData.sectorLocal || "",
  });

  useEffect(() => {
    setFormValues((prev) => ({ ...prev, ...formData }));
  }, [formData]);

  const handleChange = (field: keyof Inputs, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof Inputs, checked: boolean) => {
    setFormValues((prev) => ({ ...prev, [field]: checked ? "1" : "0" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("✅ Datos enviados:", formValues);
    updateFormData(formValues);
    nextStep();
  };

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      {/* Opciones de Entrega */}
      <FormLabel sx={{ color: "black" }}>Opciones de Entrega</FormLabel>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={formValues.realizaEnvios === "1"}
              onChange={(e) => handleCheckboxChange("realizaEnvios", e.target.checked)}
              color="primary"
            />
          }
          label="Realiza envíos a domicilio"
          sx={{ color: "black" }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formValues.soloRetiraEnTienda === "1"}
              onChange={(e) => handleCheckboxChange("soloRetiraEnTienda", e.target.checked)}
              color="primary"
            />
          }
          label="Solo retiro en tienda"
          sx={{ color: "black" }}
        />
      </Box>

      {/* Campos de Dirección */}
      {[
  { field: "callePrincipal", label: "Calle Principal" },
  { field: "calleSecundaria", label: "Calle Secundaria" },
  { field: "numeracion", label: "Numeración" },
  { field: "referencia", label: "Referencia" }
].map(({ field, label }) => (
  <Box 
    key={field} 
    sx={{ 
      display: "flex", 
      flexDirection: "column", 
      mb: 2, 
      width: "100%" 
    }}
  >
    <FormLabel htmlFor={field} sx={{ color: "black", mb: 1, fontWeight: "bold" }}>
      {label}
    </FormLabel>
    <TextField
      id={field}
      value={formValues[field as keyof Inputs]}
      onChange={(e) => handleChange(field as keyof Inputs, e.target.value)}
      placeholder={`Ingrese ${label.toLowerCase()}`}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "gray", borderRadius: "10px" },
          "&:hover fieldset": { borderColor: "blue" },
          "&.Mui-focused fieldset": { borderColor: "blue" }
        },
        backgroundColor: "white",
        borderRadius: "10px"
      }}
    />
  </Box>
))}

      {/* Selector de Sector */}
      <FormLabel htmlFor="sectorLocal" sx={{ color: "black" }}>Sector</FormLabel>
      <TextField
        id="sectorLocal"
        select
        value={formValues.sectorLocal}
        onChange={(e) => handleChange("sectorLocal", e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "gray" },
            "&:hover fieldset": { borderColor: "blue" },
            "&.Mui-focused fieldset": { borderColor: "blue" }
          },
          mb: 2
        }}
      >
        <MenuItem value="" disabled>Seleccione el sector</MenuItem>
        {zonas.map((zona) => (
          <MenuItem key={zona.nombre} value={zona.nombre}>
            {zona.nombre}
          </MenuItem>
        ))}
      </TextField>

      {/* Mapa */}
      <FormLabel sx={{ color: "black" }}>Mapa de sectorización</FormLabel>
      <LoadScript googleMapsApiKey={apiKey || ""}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {zonas.map((zona, index) => (
            <Polygon
              key={index}
              paths={zona.path}
              options={{
                fillColor: zona.color,
                fillOpacity: 0.2,
                strokeColor: zona.color,
                strokeOpacity: 0.5,
                strokeWeight: 2
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Botones */}
      <Box style={{ margin: "20px 0" }} className="button-is space-x-4">
        <Button
          variant="outlined"
          onClick={prevStep}
          className="h-e34 text-white rounded-[20px] normal-case"
          sx={{ backgroundColor: themePalette.primary, width: "171px", height: "50px", fontSize: "18px" }}
        >
          Regresar
        </Button>
        <Button
          variant="contained"
          type="submit"
          className="h-e34 text-white rounded-[20px] normal-case"
          sx={{ backgroundColor: themePalette.primary, width: "171px", height: "50px", fontSize: "18px" }}
        >
          Siguiente
        </Button>
      </Box>
    </form>
  );
};

export default ShippingDetailsForm;
