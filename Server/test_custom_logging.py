from unittest.mock import MagicMock, patch

from custom_logging import drop_color_message_key, setup_logging

# Import the functions from your module


class TestLoggingMiddleware:
    @patch("structlog.configure")
    @patch("logging.getLogger")
    def test_setup_logging_default(
        self, mock_get_logger: MagicMock, mock_structlog_configure: MagicMock
    ) -> None:
        mock_logger = MagicMock()
        mock_get_logger.return_value = mock_logger

        setup_logging()

        assert mock_get_logger.call_count == 7
        assert mock_logger.setLevel.call_args[0][0] == "INFO"
        mock_structlog_configure.assert_called_once()

    @patch("structlog.configure")
    @patch("logging.getLogger")
    @patch("logging.StreamHandler")
    def test_setup_logging_json(
        self,
        mock_stream_handler: MagicMock,
        mock_get_logger: MagicMock,
        mock_structlog_configure: MagicMock,
    ) -> None:
        mock_logger = MagicMock()
        mock_get_logger.return_value = mock_logger
        mock_handler = MagicMock()
        mock_stream_handler.return_value = mock_handler
        mock_formatter = MagicMock()

        with (
            patch("custom_logging.RotatingFileHandler") as mock_file_handler,
            patch(
                "custom_logging.structlog.stdlib.ProcessorFormatter",
                return_value=mock_formatter,
            ),
        ):
            mock_file_handler.return_value = MagicMock()
            setup_logging(json_logs=True)

            mock_file_handler.assert_called_once_with(
                "../logs/server.log", maxBytes=100000
            )
            mock_handler.setFormatter.assert_called_once_with(mock_formatter)

    def test_drop_color_message_key(self) -> None:
        event_dict = {"key1": "value1", "color_message": "value2"}
        expected_dict = {"key1": "value1"}

        result = drop_color_message_key(None, None, event_dict)

        assert result == expected_dict
