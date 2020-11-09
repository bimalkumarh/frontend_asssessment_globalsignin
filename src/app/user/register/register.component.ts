import { Component, OnInit,ViewChild } from '@angular/core';
import { ImageCroppedEvent } from "ngx-image-cropper";
import { FormBuilder, FormGroup, Validators,FormGroupDirective } from "@angular/forms";
import { UserService } from '../../services/user.service';
import { ConfirmedValidator } from '../../services/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;
  submitted = false;
  croppedImage: any = "";
  imageChangedEvent: any = "";
  showCropper: boolean = false;
  allowedExtensions: Array<string> = ['jpg', 'jpeg', 'png'];
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private fb: FormBuilder, 
    private userService: UserService) { }

  ngOnInit(): void {
    this.initializeFields();
  }

  onSubmit(regData) {
    if (this.formReg.valid) {
      const formData = new FormData();
      for (var key in regData) {
        if (key === "avathar") {
          var blob = this.dataURItoBlob(this.croppedImage);
          formData.append(key, blob);
        } else {
          formData.append(key, regData[key]);
        }
      }
      this.userService.register(formData).subscribe(vendor => console.log(vendor));
      this.showCropper = false;
      //this.formReg.reset();
      this.formGroupDirective.resetForm();
    }
    this.submitted = true;
  }

  get f() { return this.formReg.controls; }

  initializeFields() {
    this.formReg = this.fb.group({
      full_name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6),Validators.maxLength(6)]],
      re_password: ["", [Validators.required]],
      avathar: ["", [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 're_password')
    });
  }

  onFocused(e) {
    console.log('onFocused', e);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.showCropper = (event.srcElement.files.length > 0) ? true : false;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    this.showCropper = false;
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

}
