import { Component, computed, inject, input, OnInit, Signal, signal, SimpleChanges } from '@angular/core';
import { Pokemon } from '../model/pokemon.model';
import { NgClass } from '@angular/common';
import { PokemonService } from '../service/pokemon.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  private readonly pokemonService = inject(PokemonService);
  poke = input<Pokemon | null>(null);
  searchPokemon = input<string>('');
  pokeSearch = signal<Pokemon | null >(null);
  pokemon = signal<Pokemon | null>(null);

  ngOnInit() {
    this.checkPokemon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkPokemon();
  }

  async checkPokemon(){
    if(this.searchPokemon() != ''){
      this.pokeSearch.set(await firstValueFrom(this.pokemonService.searchPokemon(this.searchPokemon())))
    }
    if(this.poke() == null){
      this.pokemon.set(this.pokeSearch());
    }else{
      this.pokemon.set(this.poke());
    }
  }
}
