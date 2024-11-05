<?php
require('../../assets/fpdf/fpdf.php');
include('../../../assets/database.php');

session_start();

if (!isset($_SESSION['ci'])) {
    die("Usuario no autenticado");
}

$ci = $_SESSION['ci'];

$query = "SELECT p.id_persona AS id_cliente, CONCAT(p.nombre, ' ', p.apellido) AS nombre_completo,
                 e.cumplimiento_agenda, e.resistencia_anaerobica, e.resistencia_muscular, 
                 e.flexibilidad, e.resistencia_monotonia, e.resiliencia, e.nota
          FROM clientes_evaluaciones ce
          JOIN evaluaciones e ON ce.id_evaluacion = e.id_evaluacion
          JOIN personas p ON ce.id_cliente = p.id_persona
          WHERE ce.id_cliente = '$ci'
          ORDER BY e.id_evaluacion DESC
          LIMIT 1";

$result = mysqli_query($conn, $query);
$calificacion = mysqli_fetch_assoc($result);

if (!$calificacion) {
    die("No se encontraron calificaciones");
}

class PDF extends FPDF {
    function Header() {
        $this->SetFillColor(255, 255, 255); 
        $this->Rect(50, 8, 110, 45, 'F'); 

       
        $this->Image('../img/Logos/Logo_home.png', 90, 12, 40); 
        
        
        $this->SetFont('Arial', 'B', 22);
        $this->SetTextColor(0, 0, 0); 
        $this->SetXY(0, 60);
        $this->Cell(210, 10, 'Reporte de Calificacion y Evolucion', 0, 1, 'C', true);
        $this->Ln(10);
    }

    function Footer() {
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 8);
        $this->SetTextColor(128, 128, 128);
        $this->Cell(0, 10, 'Pagina ' . $this->PageNo() . '/{nb}', 0, 0, 'C');
    }
}

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();

$colorFondoCliente = [255, 255, 255];
$colorTablaTitulo = [153, 204, 255];
$colorTablaAspecto = [226, 226, 226];
$colorFilaImpar = [226, 226, 226];
$colorNotaFinal = [220, 255, 220];

$pdf->SetFillColor($colorFondoCliente[0], $colorFondoCliente[1], $colorFondoCliente[2]);
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(0, 14, 'Cliente: ' . $calificacion['nombre_completo'] . ' (CI: ' . $calificacion['id_cliente'] . ')', 0, 1, 'C', true);
$pdf->Ln(10);

$pdf->SetFillColor($colorTablaTitulo[0], $colorTablaTitulo[1], $colorTablaTitulo[2]);
$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(0, 14, 'Detalles de la Calificacion', 1, 1, 'C', true);

$pdf->SetFillColor($colorTablaAspecto[0], $colorTablaAspecto[1], $colorTablaAspecto[2]);
$pdf->Cell(140, 14, 'Aspecto', 1, 0, 'C', true);
$pdf->Cell(50, 14, 'Calificacion (%)', 1, 1, 'C', true);

$pdf->SetFont('Arial', '', 12);
$aspectos = [
    'Cumplimiento de Agenda' => $calificacion['cumplimiento_agenda'],
    'Resistencia Anaerobica' => $calificacion['resistencia_anaerobica'],
    'Resistencia Muscular' => $calificacion['resistencia_muscular'],
    'Flexibilidad' => $calificacion['flexibilidad'],
    'Resistencia a la Monotonia' => $calificacion['resistencia_monotonia'],
    'Resiliencia' => $calificacion['resiliencia']
];

$fill = false;
foreach ($aspectos as $aspecto => $valor) {
    $pdf->SetFillColor($fill ? $colorFilaImpar[0] : 255, $fill ? $colorFilaImpar[1] : 255, $fill ? $colorFilaImpar[2] : 255);
    $pdf->Cell(140, 12, $aspecto, 1, 0, 'L', true);
    $pdf->Cell(50, 12, $valor . ' %', 1, 1, 'C', true);
    $fill = !$fill;
}

$pdf->Ln(5);
$pdf->SetFont('Arial', 'B', 14);
$pdf->SetFillColor($colorNotaFinal[0], $colorNotaFinal[1], $colorNotaFinal[2]);
$pdf->Cell(140, 14, 'Nota Final', 1, 0, 'L', true);
$pdf->SetFont('Arial', 'B', 14);
$pdf->SetTextColor(0, 100, 0);
$pdf->Cell(50, 14, $calificacion['nota'] . ' %', 1, 1, 'C', true);

$pdf->Output('D', 'Calificacion_Reciente_' . $calificacion['id_cliente'] . '.pdf');
?>
