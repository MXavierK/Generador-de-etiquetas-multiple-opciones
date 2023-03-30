1.- Las medidas funcionan por medio de estilos css, cuando cambias una medida relamente se esta apuntando a un css diferente.
2.- Para crear nuevas medidas se debe realizar una nueva hoja de css modificando los valores de: .logo .titleEtiqueta .barcode #diviconos .iconos .descriptionFooter #footerEtiqueta .boxEtiqueta
3.- Se puede agregar más checkbox, en el archivo JS deberán agregar el listener: 
const checkboxN = document.getElementById('chbox1');
	checkboxN.addEventListener('change', function () {
		const link = document.getElementById('estilos');

		if (this.checked) {
			link.href = 'Medidas/Name.css';
		}

	});
	
4.- En la función crearEtiquetas() se crean las etiquetas, ahi deberá modificarse la información de etiqueta por ejemplo logotipo, iconos, textos, entre otros.