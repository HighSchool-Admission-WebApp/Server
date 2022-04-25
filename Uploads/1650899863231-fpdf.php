<!DOCTYPE html>
<html>
<body>

 <?php
    
   require("fpdf.php");
   $pdf -> new FPDF();
   $pdf -> AddPage();
   $pdf -> SetFont(Arial,B,12);
   $pdf -> Cell(10,25,"Hello Aditya");
   $pdf -> Output("Aditya.pdf");

?>
</body>
</html>