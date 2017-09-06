<!DOCTYPE html>
<html>
<head>
	<title>products</title>
	<link rel="stylesheet" type="text/css" href="layout.css">
	
</head>
<body>
<!-- nav bar -->
	<ul>
		<li><h4>NESTLE</h4></li>
	
		
	<li><a href="#dashboard" id="item">Dashboard</a></li>
	<li><a href="products.php">Products</a></li>
	<li><a href="transfer.php">Transfer</a></li>
	<li><a href="operations.php">Operations</a></li>
	<li><a href="warehouse.php">Warehouse</a></li>
	</ul>
	
	<br>
	<!-- end of nav bar -->
<!-- Trigger/Open The Modal -->
<button id="myBtn">ADD PRODUCT</button>
<!-- The Modal -->
<div id="myModal" class="modal">
<!-- Modal content -->
<div class="modal-content">
<span class="close">&times;</span>
<h3>Enter the product detials here</h3>
<form>
<label>PRODUCT NAME:</label><br>
<input type="text" name="pname"><br><br>
<label>DESCRIPTION:</label><br>
<input type="text" name="desc"><br><br>
<label>QUANTITY:</label><br>
<input type="number" name="pname"><br><br>
<label>SELLING PRICE:</label><br>
<input type="number" name="pname"><br><br>
<input type="submit">
</form>

</div>

</div>

<script>
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
</script>

<?php

echo "<h1>Products in the inventory:</h1>";
echo "<table id=productsTable>
	<tr>
		<th>Product</th>
		<th>Description</th>
		<th>Quantity</th>
		<th>Selling Price</th>
	</tr>
</table>";







?>

</body>
</html>