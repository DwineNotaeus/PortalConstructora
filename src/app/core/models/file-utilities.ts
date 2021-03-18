import { Observable, Observer } from "rxjs";

export class FileUtilities {
    base64TrimmedURL: any;

    base64DefaultURL: any;

    generatedImage: any;



    getBase64ImageFromURL(url: string) {
        class type {
            ext: string;
            type: string;
        }
        var doctype = this.getExt(url, type).ext
        if (doctype == ".jpg") {
            return this.getBase64ImageReturn(url);
        }
        else {
            if (doctype == ".pdf") {
                return this.getBase64FileReturn(url);
            }
        }
    }
    getBase64ImageReturn(url: string) {
        return Observable.create((observer: Observer<string>) => {
            
            let img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;
            if (!img.complete) {
                img.onload = () => {
                    observer.next(this.getBase64Image(img));
                    observer.complete();
                };
                img.onerror = (err) => {
                    observer.error(err);

                };

            } else {

                observer.next(this.getBase64Image(img));

                observer.complete();

            }

        });
    }

    getBase64FileReturn(url: string) {
        return Observable.create((observer: Observer<string>) => {

            // create an image object

            

            let img = URL.createObjectURL(url);




        });

    }

    getBase64Image(img: HTMLImageElement) {

        

        // We create a HTML canvas object that will create a 2d image

        var canvas = document.createElement("canvas");

        canvas.width = img.width;

        canvas.height = img.height;

        var ctx = canvas.getContext("2d");

        // This will draw image   

        ctx.drawImage(img, 0, 0);

        // Convert the drawn image to Data URL

        var dataURL = canvas.toDataURL("image/png");

        this.base64DefaultURL = dataURL;
        

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    }

    downloadFile(data: any, url: any) {

        
        this.base64TrimmedURL = data;
        const date = new Date().valueOf();
        let text = '';
        class type {
            ext: string;
            type: string;
        }

        var filetype = this.getExt(url, type);

        const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
        }
        
        const imageName = date + '.' + text + filetype.ext;
        console.log(imageName);
        // call method that creates a blob from dataUri



        let imageBlob;
        this.dataURItoBlob(this.base64TrimmedURL).subscribe(data => {
            
            imageBlob = data;

        });
        
        const imageFile = new File([imageBlob], imageName, { type: this.getExt(url, type).type });
        this.generatedImage = window.URL.createObjectURL(imageFile);
        //window.open(this.generatedImage);
        var a = document.createElement("a");
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.href = this.generatedImage;
        var f = new Date();
        a.download = f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear() + '-' + f.getHours() + '-' + f.getMinutes() + '-' + f.getSeconds() + filetype.ext;/* your file name*/

        a.click();


    }

    getImage(url) {

        this.getBase64ImageFromURL(url).subscribe((data: string) => {
            this.base64TrimmedURL = data;
            const date = new Date().valueOf();
            let text = '';
            class type {
                ext: string;
                type: string;
            }
            const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 5; i++) {
                text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
            }
            
            const imageName = date + '.' + text + this.getExt(url, type).ext;
            console.log(imageName);
            // call method that creates a blob from dataUri



            let imageBlob;
            this.dataURItoBlob(this.base64TrimmedURL).subscribe(data => {
                
                imageBlob = data;

            });
            
            const imageFile = new File([imageBlob], imageName, { type: this.getExt(url, type).type });
            this.generatedImage = window.URL.createObjectURL(imageFile);
            //window.open(this.generatedImage);
            var a = document.createElement("a");
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.href = this.generatedImage;
            var f = new Date();
            a.download = f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear() + '-' + f.getHours() + '-' + f.getMinutes() + '-' + f.getSeconds() + '.jpg';/* your file name*/

            a.click();

        });

        // Naming the image



    }
    getExt(url, type) {

        var k = new type();

        if (url.endsWith(".xlsx")) {
            k.ext = ".xlsx";
            k.type = "application/vnd.ms-excel";
        }

        if (url.endsWith(".xls")) {
            k.ext = ".xls";
            k.type = "application/vnd.ms-excel";
        }

        if (url.endsWith(".jpeg")) {
            k.ext = ".jpeg";
            k.type = "image/jpeg";
        }
        if (url.endsWith(".tif")) {
            k.ext = ".tif";
            k.type = "image/tiff";
        }

        if (url.endsWith(".png")) {
            k.ext = ".png";
            k.type = "image/png";
        }

        if (url.endsWith(".pdf")) {
            k.ext = ".pdf";
            k.type = "application/pdf";
        }

        if (url.endsWith(".jpg")) {
            k.ext = ".jpg";
            k.type = "image/jpg";
        }

        return k;
    }

    dataURItoBlob(dataURI): Observable<Blob> {

        return Observable.create((observer: Observer<Blob>) => {

            

            const byteString = window.atob(dataURI);

            const arrayBuffer = new ArrayBuffer(byteString.length);

            const int8Array = new Uint8Array(arrayBuffer);

            for (let i = 0; i < byteString.length; i++) {

                int8Array[i] = byteString.charCodeAt(i);

            }
            
            const blob = new Blob([int8Array], { type: 'image/jpg' });

            observer.next(blob);

            observer.complete();

        });

    }
}
