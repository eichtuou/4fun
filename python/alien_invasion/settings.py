class Settings:
    """A class to store all settings for Alien Invasion."""

    def __init__(self):
        """Initialize the game's settings."""

        # screen settings
        self.screen_width = 1200
        self.screen_height = 800
        self.bg_color = (0, 0, 0)

        # ship settings
        self.ship_speed = 7.5

        # bullet settings
        self.bullet_speed = 15.0
        self.bullet_width = 3
        self.bullet_height = 7
        self.bullet_color = (255, 255, 255)
        self.bullets_allowed = 6

        # alien settings
        self.alien_speed = 1.0
        self.fleet_drop_speed = 1
        self.fleet_direction = 1
