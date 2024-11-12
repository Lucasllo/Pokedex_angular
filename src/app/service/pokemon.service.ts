import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../model/pokemon.model';
import { catchError, Observable, tap, timeInterval, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private API = environment.pokemonAPI;
  private pokemon = signal<Pokemon | null>(null);
  private pokemons = signal<string[]>([]);

  pokemonSelected = this.pokemon.asReadonly();
  allPokemons = this.pokemons.asReadonly();

  getPokemon(name: string): Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.API}${name}`).pipe(tap({
      next: p => this.pokemon.set(p)
    }));
  }

  getAllPokemons(total:number): Observable<{results: {name: string, url: string}[]}>{
    return this.http.get<{results: {name: string, url: string}[]}>(`${this.API}?limit=${total}&offset=0`).pipe(tap({
      next: p => {
        this.pokemons.update((oldPokemons) => [...oldPokemons, ...(p.results.map(o => o.url))])
      }
    }));
  }

  searchPokemon(url: string){
    return this.http.get<Pokemon>(url);
  }
}
