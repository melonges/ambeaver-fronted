/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * Ambeaver API
 * OpenAPI spec version: 0.0.1
 */
import type { AmbersCreatedAt } from "./ambersCreatedAt";
import type { AmbersUpdatedAt } from "./ambersUpdatedAt";
import type { Player } from "./player";

export interface Ambers {
  amount: number;
  createdAt: AmbersCreatedAt;
  id: number;
  player: Player;
  updatedAt: AmbersUpdatedAt;
}
