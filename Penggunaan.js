import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios';

class Penggunaan extends Component {

    constructor() {
        super();
        this.state = {
            penggunaan: [], // Array penggunaan untuk menampung data penggunaan
            id_penggunaan: "",
            nama: "",
            tanggal: "",
            meterawal: "",
            meterakhir: "",
            action: "",
            search: "",
        }
	}
	
	bind = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

	Add = () => {
		// mengosongkan isi variabel no_absen, nama_lengkap, dan kelas
		// set action menjadi "insert"
		this.setState({
            id_penggunaan: "",
            nama: "",
            tanggal: "",
            meterawal: "",
            meterakhir: "",
		    action: "insert"
		});
	  }
	
	  Edit = (item) => {
		/*
		- mengisikan isi variabel no_absen, nama_lengkap, kelas sesuai dengan data yang
		akan diedit
		- set action menjadi "update"
		*/
		this.setState({
            id_penggunaan: item.id_penggunaan,
            nama: item.nama,
            tanggal: item.tanggal,
            meterawal: item.meterawal,
            meterakhir: item.meterakhir,
		    action: "update"
		});
	  }
	
	  getPenggunaan = () => {
		let url = "http://localhost:1337/penggunaan";
		// mengakses api untuk mengambil data penggunaan
		axios.get(url)
		.then(response => {
		  // mengisikan data dari respon API ke array penggunaan
		  this.setState({penggunaan: response.data.penggunaan});
		})
		.catch(error => {
		  console.log(error);
		});
	  }
	
	  findPenggunaan = (event) => {
		let url = "http://localhost:1337/penggunaan";
		if (event.keyCode === 13) {
		  // menampung data keyword pencarian
		  let form = {
			find: this.state.search
		  }
		  // mengakses api untuk mengambil data penggunaan
		  // berdasarkan keyword
		  axios.post(url, form)
		  .then(response => {
			// mengisikan data dari respon API ke array penggunaan
			this.setState({penggunaan: response.data.penggunaan});
		  })
		  .catch(error => {
			console.log(error);
		  });
		}
	  }
	
	  SavePenggunaan = (event) => {
		event.preventDefault();
		/* menampung data no_absen, nama_lengkap dan kelas dari Form
		ke dalam FormData() untuk dikirim  */
		let url = "";
		if (this.state.action === "insert") {
		  url = "http://localhost:1337/penggunaan/save"
		} else {
		  url = "http://localhost:1337/penggunaan/update"
		}
		
	
		let form = {
            id_penggunaan: this.state.id_penggunaan,
            nama: this.state.nama,
            tanggal: this.state.tanggal,
            meterawal: this.state.meterawal,
            meterakhir: this.state.meterakhir
		}
	
		// mengirim data ke API untuk disimpan pada database
		axios.post(url, form)
		.then(response => {
		  // jika proses simpan berhasil, memanggil data yang terbaru
		  this.getPenggunaan();
		})
		.catch(error => {
		  console.log(error);
		});
		// menutup form modal
		$("#modal").modal('hide');
	  }
	
	  Drop = (id_penggunaan) => {
		let url = "http://localhost:1337/penggunaan/" + id_penggunaan;
		// memanggil url API untuk menghapus data pada database
		if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
		  axios.delete(url)
		  .then(response => {
			// jika proses hapus data berhasil, memanggil data yang terbaru
			this.getPenggunaan();
		  })
		  .catch(error => {
			console.log(error);
		  });
		}
	  }
	
	  componentDidMount(){
		// method yang pertama kali dipanggil pada saat load page
		this.getPenggunaan()
	  }
	

    render(){  
        return (  
            <div className="m-3 card">  
	        <div className="card-header bg-info text-white">Data Penggunaan</div>  
	        <div className="card-body">  
    	        <input type="text" className="form-control mb-2" name="search" value={this.state.search}  
    	          onChange={this.bind} onKeyUp={this.findPenggunaan} placeholder="Pencarian..." />  
    	        {/* tampilan tabel penggunaan */}  
    	          <table className="table">  
    	            <thead>  
    	              <tr>  
    	                <th>ID</th>  
    	                <th>Nama</th>  
    	                <th>Tanggal</th>  
    	                <th>Meter Awal</th>  
                        <th>Meter Akhir</th>
    	              </tr>  
    	            </thead>  
    	            <tbody>  
    	              {this.state.penggunaan.map((item,index) => {  
    	                return (  
    	                  <tr key={index}>  
    	                    <td>{item.id_penggunaan}</td>  
    	                    <td>{item.nama}</td>  
    	                    <td>{item.tanggal}</td>
                            <td>{item.meterawal}</td>  
                            <td>{item.meterakhir}</td>    
    	                    <td>  
    	                      <button className="btn btn-sm btn-info m-1" data-toggle="modal"  
    	                      data-target="#modal" onClick={() => this.Edit(item)}>  
    	                        Edit  
    	                      </button>  
    	                      <button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_penggunaan)}>  
    	                        Hapus  
    	                      </button>  
    	                    </td>  
    	                  </tr>  
    	                );  
    	              })}  
    	            </tbody>  
    	          </table>  
    	          <button className="btn btn-success" onClick={this.Add}  
    	          data-toggle="modal" data-target="#modal">  
    	            Tambah Data  
    	          </button>  
    	          {/* modal form penggunaan */}  
    	          <div className="modal fade" id="modal">  
    	            <div className="modal-dialog">  
    	              <div className="modal-content">  
    	                <div className="modal-header">  
    	                  Form Penggunaan  
    	                </div>  
    	                <form onSubmit={this.SavePenggunaan}>  
    	                  <div className="modal-body">  
    	                    ID Penggunaan  
    	                    <input type="number" name="id_penggunaan" value={this.state.id_penggunaan} onChange={this.bind}  
    	                    className="form-control" required />  
    	                    Nama
    	                    <input type="text" name="nama" value={this.state.nama} onChange={this.bind}  
    	                    className="form-control" required />  
    	                    Tanggal  
    	                    <input type="text" name="tanggal" value={this.state.tanggal} onChange={this.bind}  
    	                    className="form-control" required />  
                            Meter Awal  
    	                    <input type="text" name="meterawal" value={this.state.meterawal} onChange={this.bind}  
    	                    className="form-control" required />  
                            Meter Akhir  
    	                    <input type="text" name="meterakhir" value={this.state.meterakhir} onChange={this.bind}  
    	                    className="form-control" required />  
    	                  </div>  
    	                  <div className="modal-footer">  
    	                    <button className="btn btn-sm btn-success" type="submit">  
    	                    Simpan  
    	                    </button>  
    	                  </div>  
    	                </form>  
    	              </div>  
    	            </div>  
    	          </div>  
    	        </div>  
    	      </div>  
    	    );  
    	  }  
}

export default Penggunaan;