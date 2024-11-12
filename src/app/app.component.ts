import { Component, inject, Signal, signal, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './card/card.component';
import { PokemonService } from './service/pokemon.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Pokemon } from './model/pokemon.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly pokemonService = inject(PokemonService);
  searchPokemon = signal<string>('');
  pokemon = this.pokemonService.pokemonSelected;
  search = false;
  allPokemon = signal<string[]>([]);

  constructor(){
    this.searchPokemons();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.searchPokemon() == ''){
      this.reset();
    }
  }

  setPokemon(){
    this.search = true;
    this.pokemonService.getPokemon(this.searchPokemon()).subscribe({
      error: err => console.log(err)
    });
  }

  searchPokemons(max:number = 20){
    this.pokemonService.getAllPokemons(max).subscribe({
      next: p => {
        this.allPokemon.set([...p.results.map(o => o.url)]);
        // this.allPokemon.update((oldPokemons) =>  [...oldPokemons, ...(p.results.filter((p, index) => p.url != oldPokemons[index] ).map(o => o.url))])
      },
      error: err => console.log(err)
    });
  }

  reset(){
    this.searchPokemon.set('');
    this.search = false;
  }
}
