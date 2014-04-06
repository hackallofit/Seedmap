/**
 * @author Alex Acevedo
 */
	//A Test Torrent
	//magnet:?xt=urn:btih:d266b48a9e61435bd6f044f0a11bc12b6fc56f1d&dn=Nerf+Gun&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337
	var map = L.map('map').setView([51.505, -0.09], 13);
	
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
	}).addTo(map);

	var btapp = new Btapp();
	btapp.connect();
	
	function removeTorrent(thisId) {
		btapp.get('torrent').get(thisId).remove();
	};
	
	function submitTorrent(){
		//var grabURI = document.getElementById('inputMagnet').value;
		//alert(grabURI);
	 	btapp.live('add', function(add) {
	 		var grabURI = document.getElementById('inputMagnet').value;
	 		add.torrent(grabURI);
	 	}); 	
	};
	
	function torrentInfo() {
		$("#listEm tr").remove();
			 $('#listEm').append('<tr><td>Torrent Name</td><td>Percent Complete</td><td>Seed Count</td><td>Peer Count</td><td>Remove Torrent</td></tr>');
			 btapp.get('torrent').each(function(torrent) {
		  		var torrentName = torrent.get('properties').get('name');
		  		var torrentLink = torrent.get('properties').get('uri');
		  		var torrentHash = torrent.get('properties').get('hash');
		  		var seedNumber = torrent.get('properties').get('seeds_connected');
		  		var peerNumber = torrent.get('properties').get('peers_connected');
		  		var percentComplete = torrent.get('properties').get('progress')/10;
		  		
		  		torrent.get('peer').each(function(peer) {
		  			
		  		});
		  		
		  		$('#listEm').append('<tr><td><a href="' + torrentLink + '">' + torrentName + '</a></td><td>' + percentComplete + '</td><td>' + seedNumber + '</td><td>' + peerNumber + '</td></td><td><button id="'+ torrentHash +'" onclick="removeTorrent(this.id)">Remove</button></td></tr>');	  			
		    });
	};

	setInterval(function() {torrentInfo();}, 1000);
	
	
	function seedMap() {
			btapp.get('torrent').each(function(torrent) {
				var torrentName = torrent.get('properties').get('name');
				var torrentHash = torrent.get('properties').get('hash');
		  		torrent.get('peer').each(function(peer) {
		  			var ip = peer.get('properties').get('ip');
		  			$.ajax({
		  			type: 'GET',
     				url: "http://www.telize.com/geoip/" + ip + "?callback=getgeoip",
     				dataType: 'json',
		     		success: function(json){
				    		     lat = json.latitude;
					    	     lon = json.longitude;
					    	     L.marker([lat, lon]).addTo(map)
    						     .bindPopup(ip)
    							 .openPopup();
    						},
    				failure: function() {
    				alert('Fail!');
    				}
    				});
    		});
   });
 };
//Another Test Torrent:
//http://www.legittorrents.info/download.php?id=8fa84aae7a629b6346c1a881ce5fda929e0fd9ad&f=Pixelhive%20-%2014th%20April%202013%20-%20Best%20Minecraft%20Creations.torrent