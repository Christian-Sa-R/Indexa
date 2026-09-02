import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ContainerComponent } from '../../componentes/container/container.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    SeparadorComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './formulario-contato.component.html',
  styleUrl: './formulario-contato.component.css',
})
export class FormularioContatoComponent implements OnInit {
  contatoForm!: FormGroup;

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.inicializarFormulario();
    this.carregarContato();
  }

  inicializarFormulario() {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      avatar: new FormControl(''),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      aniversario: new FormControl(''),
      redes: new FormControl(''),
      observacoes: new FormControl(''),
    });
  }

  obterControle(campo: string): FormControl {
    const control = this.contatoForm.get(campo);
    if (!control) {
      throw new Error('Controle de formulário não encontrado: ' + campo);
    }
    return control as FormControl;
  }

  carregarContato() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.contatoService.buscaPorId(parseInt(id)).subscribe((contato) => {
        this.contatoForm.patchValue(contato);
      });
    }
  }

  aoSelecionarArquivo(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.lerArquivo(file);
    }
  }

  lerArquivo(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.contatoForm.get('avatar')?.setValue(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  salvarContato() {
    const novoContato = this.contatoForm.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    novoContato.id = id ? parseInt(id) : null;

    this.contatoService.editarOuCriarContato(novoContato).subscribe(() => {
      this.contatoForm.reset();
      this.router.navigateByUrl('/lista-contatos');
    });
  }

  cancelar() {
    this.contatoForm.reset();
    this.router.navigateByUrl('/lista-contatos');
  }
}
