togglebaselayerPanel = function(show){
    panel = document.getElementById('baselayers');
    if (show){
    	
        panel.style.display = 'block';
    }
    else{
        panel.style.display = 'none';
    }
};

toggleoverlayerPanel = function(show){
    panel = document.getElementById('overlayers');
    if (show){
    	
        panel.style.display = 'block';
    }
    else{
        panel.style.display = 'none';
    }
};

toggleterrainsPanel = function(show){
    panel = document.getElementById('terrains');
    if (show){
        panel.style.display = 'block';
    }
    else{
        panel.style.display = 'none';
    }
};

toggleallpanel=function(show){
	 panel = document.getElementById('overlayers');
	 panel1 = document.getElementById('baselayers');
 
	if (show){
        panel.style.display = 'block';
        panel1.style.display = 'block';
    }
    else{
        panel.style.display = 'none';
        panel1.style.display = 'none';
    }
	
	
	
	
	
};
