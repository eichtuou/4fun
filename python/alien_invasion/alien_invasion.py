"""
This is my version of the project from the Python Crash Course 3rd Edition Book.

In Alien Invasion, the player controls a rocket ship that appears at the bottom
center of the screen. The player can move the ship right and left using the arrow
keys and shoot bullets using the spacebar. When the game begins, a fleet of aliens
fills the sky and moves across and down the screen. The player shoots and destroys
the aliens. If the player destroys all the aliens, a new fleet appears that moves
faster than the previous fleet. If any alien hits the player’s ship or reaches the
bottom of the screen, the player loses a ship. If the player loses three ships, the
game ends.
"""
import sys
import pygame
from settings import Settings
from ship import Ship
from bullet import Bullet
from alien import Alien


class AlienInvasion:
    """Overall class to manage game assets and behavior."""

    def __init__(self):
        """Initialize the game, and create game resources."""

        # initialize game
        pygame.init()
        pygame.display.set_caption("Alien Invasion")

        # frame rate
        self.clock = pygame.time.Clock()

        # import settings
        self.settings = Settings()
        self.screen = pygame.display.set_mode((self.settings.screen_width, self.settings.screen_height))

        # ship
        self.ship = Ship(self)

        # bullets
        self.bullets = pygame.sprite.Group()

        # aliens
        self.aliens = pygame.sprite.Group()
        self._create_fleet()

    def _fire_bullet(self):
        """Create a new bullet and add it to the bullets group."""

        if len(self.bullets) < self.settings.bullets_allowed:
            new_bullet = Bullet(self)
            self.bullets.add(new_bullet)

    def _update_bullets(self):
        """Update position of bullets and get rid of old bullets."""

        # update positions
        self.bullets.update()

        # delete bullets that are no longer in the screen
        for bullet in self.bullets.copy():
            if bullet.rect.bottom <= 0:
                self.bullets.remove(bullet)

    def _create_alien(self, x_position, y_position):
        """Create an alien and place it in the row."""

        new_alien = Alien(self)
        new_alien.x = x_position
        new_alien.rect.x = x_position
        new_alien.rect.y = y_position
        self.aliens.add(new_alien)

    def _create_fleet(self):
        """Create the fleet of aliens."""

        alien = Alien(self)

        # get alien dimensions
        alien_width, alien_height = alien.rect.size
        current_x, current_y = alien_width, alien_height

        # create rows of aliens with 1 alien width in between
        while current_y < (self.settings.screen_height - 7 * alien_height):
            while current_x < (self.settings.screen_width - 2 * alien_width):
                self._create_alien(current_x, current_y)
                current_x += 2 * alien_width
            current_x = alien_width
            current_y += 2 * alien_height

    def _check_fleet_edges(self):
        """Respond appropriately if any aliens have reached an edge."""

        for alien in self.aliens.sprites():
            if alien.check_edges():
                self._change_fleet_direction()
                break

    def _change_fleet_direction(self):
        """Drop the entire fleet and change the fleet's direction."""

        for alien in self.aliens.sprites():
            alien.rect.y += self.settings.fleet_drop_speed
        self.settings.fleet_direction *= -1

    def _update_aliens(self):
        """Check if the fleet is at an edge, then update positions."""

        self._check_fleet_edges()
        self.aliens.update()

    def _check_events(self):
        """Respond to keypresses and mouse events."""

        for event in pygame.event.get():
            # quit game if window is closed
            if event.type == pygame.QUIT:
                sys.exit()

            # check for keypresses
            elif event.type == pygame.KEYDOWN:
                self._check_keydown_events(event)

            # check for key releases
            elif event.type == pygame.KEYUP:
                self._check_keyup_events(event)

    def _check_keydown_events(self, event):
        """Respond to keypresses."""

        # quit game by pressing q
        if event.key == pygame.K_q:
            sys.exit()

        # move right
        elif event.key == pygame.K_RIGHT:
            self.ship.moving_right = True

        # move left
        elif event.key == pygame.K_LEFT:
            self.ship.moving_left = True

        # fire bullets
        elif event.key == pygame.K_SPACE:
            self._fire_bullet()

    def _check_keyup_events(self, event):
        """Respond to key releases."""

        # stop moving right
        if event.key == pygame.K_RIGHT:
            self.ship.moving_right = False

        # stop moving left
        elif event.key == pygame.K_LEFT:
            self.ship.moving_left = False

    def _update_screen(self):
        """Update images on the screen, and flip to the new screen."""

        # background
        self.screen.fill(self.settings.bg_color)

        # draw bullets
        for bullet in self.bullets.sprites():
            bullet.draw_bullet()

        # refresh screen
        self.ship.blitme()
        self.aliens.draw(self.screen)
        pygame.display.flip()

    def run_game(self):
        """Start the main loop for the game."""

        while True:
            self.clock.tick(60)
            self._check_events()
            self.ship.update()
            self._update_bullets()
            self._update_aliens()
            self._update_screen()


if __name__ == '__main__':
    """ Make a game instance, and run the game."""
    ai = AlienInvasion()
    ai.run_game()