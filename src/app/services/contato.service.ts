import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contato } from '../componentes/contato/contato';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private readonly API = 'http://localhost:3000/contatos';

  constructor(private http: HttpClient) {}

  obterContatos() {
    return this.http.get<Contato[]>(this.API);
  }

  salvarContato(contato: Contato) {
    return this.http.post<Contato>(this.API, contato);
  }

  buscaPorId(id: number): Observable<Contato> {
    const url = `${this.API}/${id}`;
    return this.http.get<Contato>(url);
  }

  excluirPorId(id: number): Observable<Contato> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Contato>(url);
  }

  editarContato(contato: Contato): Observable<Contato> {
    const url = `${this.API}/${contato.id}`;
    return this.http.put<Contato>(url, contato);
  }

  editarOuCriarContato(contato: Contato): Observable<Contato> {
    if (contato.id) {
      return this.editarContato(contato);
    } else {
      return this.salvarContato(contato);
    }
  }
}
