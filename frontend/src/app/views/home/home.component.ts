import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ClientModel } from 'src/app/modelo/ClientElement';
import { ClientDialogComponent } from 'src/app/shared/client-dialog/client-dialog.component';
import { PersonService } from 'src/app/shared/services/person.service';

const data: ClientModel[] = [];

interface AmountStates {
  state: string
  amount: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'name', 'email', 'state', 'city', 'telephone', 'actions'];
  dataSource = data;
  amountStates: AmountStates[] = [];

  constructor(public dialog: MatDialog, private servico: PersonService) { }

  ngOnInit(): void {
    this.getPerson();
  }

  openDialog(client: ClientModel | null): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '250px',
      data: client === null ? {
        id: null,
        name: '',
        email: '',
        state: '',
        city: '',
        telephone: null
      } : {
        id: client.id,
        name: client.name,
        email: client.email,
        state: client.state,
        city: client.city,
        telephone: client.telephone
      }
    });
  }

  updatePerson(client: ClientModel): void {
    this.openDialog(client);
  }

  getPerson() {
    this.servico.getPerson()
      .subscribe(retorno => {
        this.dataSource = retorno; this.fillAmountStates();
      });
  }

  delete(codigo: number) {
    this.servico.deletePerson(codigo)
      .subscribe(retorno => {
        window.location.reload();
      })
  }

  fillAmountStates() {
    for (let i = 0; i < this.dataSource.length; i++) {
      let estado = ""
      switch (this.dataSource[i].state) {
        case "AC":
          estado = "Acre"
          break;

        case "AL":
          estado = "Alagoas"
          break;

        case "AP":
          estado = "Amapá"
          break;

        case "AM":
          estado = "Amazonas"
          break;

        case "BA":
          estado = "Bahia"
          break;

        case "CE":
          estado = "Ceará"
          break;

        case "DF":
          estado = "Distrito Federal"
          break;

        case "ES":
          estado = "Espírito Santo"
          break;

        case "GO":
          estado = "Goiânia"
          break;

        case "MA":
          estado = "Maranhão"
          break;

        case "MT":
          estado = "Mato Grosso"
          break;

        case "MS":
          estado = "Mato Grosso do Sul"
          break;

        case "MG":
          estado = "Minas Gerais"
          break;

        case "PA":
          estado = "Pará"
          break;

        case "PB":
          estado = "Peraíba"
          break;

        case "PR":
          estado = "Paraná"
          break;

        case "PE":
          estado = "Pernambuco"
          break;

        case "PI":
          estado = "Piauí"
          break;

        case "RJ":
          estado = "Rio de Janeiro"
          break;

        case "RN":
          estado = "Rio Grande Do Norte"
          break;

        case "RS":
          estado = "Rio Grande Do Sul"
          break;

        case "RO":
          estado = "Rondônia"
          break;

        case "RR":
          estado = "Roraima"
          break;

        case "SC":
          estado = "Santa Catarina"
          break;

        case "SP":
          estado = "São Paulo"
          break;

        case "SE":
          estado = "Sergipe"
          break;

        case "TO":
          estado = "Tocantis"
          break;
      }

      const indice = this.existStateInList(estado)
      if (indice != -1) {
        this.amountStates[indice].amount += 1
      } else {
        this.amountStates.push({
          state: estado,
          amount: 1
        })
      }
    }
  }

  existStateInList(state: string): number {
    for (let index = 0; index < this.amountStates.length; index++) {
      if (this.amountStates[index].state == state) {
        return index
      }
    }
    return -1
  }
}