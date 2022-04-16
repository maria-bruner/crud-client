import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientModel } from 'src/app/modelo/ClientElement';
import { PersonService } from '../services/person.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
})
export class ClientDialogComponent implements OnInit {
  client!: ClientModel;
  isChange!: boolean;
  estados: any[] = [];
  cidades: any[] = [];
  estadoCounts: any[] = [];
  nameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required]);
  telephoneControl = new FormControl('', [Validators.required]);
  stateControl = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ClientModel,
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    private servico: PersonService
  ) { }

  ngOnInit(): void {
    if (this.data.id !== null) {
      this.isChange = true;
    }
    else {
      this.isChange = false;
    }

    this.selectStates();

    if (this.data.state !== null) {
      this.selectCities()
    }
  }

  getErrorMessage() {
    return 'Preencha o campo corretamente!'
  }

  selectStates() {
    this.servico.getStates()
      .subscribe(retorno => this.estados = retorno)
  }

  selectCities() {
    this.servico.getCities(this.data.state)
      .subscribe(retorno => this.cidades = retorno)
  }

  formIsValid(): boolean {
    const cityValid = this.fieldIsValid(this.cityControl)
    const nameValid = this.fieldIsValid(this.nameControl)
    const emailValid = this.fieldIsValid(this.emailControl)
    const stateValid = this.fieldIsValid(this.stateControl)
    const telephoneValid = this.fieldIsValid(this.telephoneControl)

    return cityValid && nameValid && emailValid && stateValid && telephoneValid
  }

  fieldIsValid(control: FormControl): boolean {
    control.markAsTouched();
    return control.valid
  }

  insert() {
    if (this.formIsValid()) {
      this.servico.getPerson().subscribe(persons => {
        let exist = false
        for (let i = 0; i < persons.length; i++) {
          if (persons[i].name == this.data.name) {
            exist = true
            break
          }
        }

        if (exist) {
          alert('Preencha um nome não cadastrado!')
        } else {
          this.servico.insertPerson(this.data)
            .subscribe(retorno => this.data = retorno)
          window.location.reload();
        }
      })
    }
  }

  update() {
    if (this.formIsValid()) {
      this.servico.getPerson().subscribe(persons => {
        let exist = false
        for (let i = 0; i < persons.length; i++) {
          if (persons[i].name == this.data.name) {
            exist = true
            break
          }
        }

        if (exist) {
          alert('Preencha um nome não cadastrado!')
        } else {
          this.servico.updatePerson(this.data)
            .subscribe(retorno => this.data = retorno)
          window.location.reload();
        }
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}