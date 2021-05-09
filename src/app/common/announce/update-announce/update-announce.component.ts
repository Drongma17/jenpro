import { Announce } from './../../../shared/model/announce';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnounceService } from './../../../shared/services/announce.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-announce',
  templateUrl: './update-announce.component.html',
  styleUrls: ['./update-announce.component.css']
})
export class UpdateAnnounceComponent implements OnInit {

  id: number;
  announces: any = [];
  announceObject: Announce;
  exist: boolean = false;
  announceFile: File;
  constructor(private announceService: AnnounceService, private router: Router,
    private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = +params['id']
    })

    this.announceService.getAllAnnounces().subscribe(result => {
      this.announces = result;
      for (var i = 0; i < this.announces.length; i++) {
        if (parseInt(this.announces[i].id) === this.id) {
          this.exist = true;
          this.announceObject = this.announces[i];
          break;
        } else {
          this.exist = false;
        }
      }
    })
  }

  updateAnnounce() {
    const formData = new FormData();
    formData.append('announce', JSON.stringify(this.announceObject));
    if (this.announceFile) {
      formData.append('file', this.announceFile);
    }
    this.announceService.clearCache();
    this.announceService.saveAnnouncement(formData).subscribe(resp => {
      this.router.navigate(['/list_announce']);
      this.toastr.success('Announcement Updated Successfully', 'Announcement');
    })
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    this.announceFile = file;
  }


}
