/**
 * @author Alex Acevedo
 */
	//A Test Torrent
	//magnet:?xt=urn:btih:d266b48a9e61435bd6f044f0a11bc12b6fc56f1d&dn=Nerf+Gun&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337
	
	function hollaback() {
		alert("Torrent added!");
	}
	
	function submitTorrent(){
		$("#torrentForm").fadeOut("slow");
		var grabURI = document.getElementById("inputMagnet").value;
		var btapp = new Btapp();
	 	btapp.connect();
	 	
	 	btapp.live('add', function(add) {
	 		add.torrent({
	 			url:grabURI,
	 			callback:hollaback
	 		});
	 	});
	};
 
//Another Test Torrent:
//http://www.legittorrents.info/download.php?id=8fa84aae7a629b6346c1a881ce5fda929e0fd9ad&f=Pixelhive%20-%2014th%20April%202013%20-%20Best%20Minecraft%20Creations.torrent