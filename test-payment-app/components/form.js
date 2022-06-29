import { Box, Button, Group, PasswordInput, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';

function PaymentForm() {
  const form = useForm({
    initialValues: {
      cardNumber: null,
      expirationDate: false,
      cvv: 'secret',
      Amount: null,
    },

    validate: {
      cardNumber: null,
      expirationDate: false,
      cvv: 'secret',
      Amount: null,
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(values => console.log(values))}>
        <NumberInput
          hideControls
          placeholder="Card number"
          label="Card number"
          required
        />
        <DatePicker
          placeholder="MM/YYYY"
          label="Expiry date"
          inputFormat="MM/YYYY"
          labelFormat="MM/YYYY"
          defaultValue={new Date()}
          required
        />
        <PasswordInput
          placeholder="CVV"
          label="CVV"
          {...form.getInputProps('password')}
          required
        />
        <NumberInput
          defaultValue={0}
          placeholder="Amount"
          label="Payment amount"
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          formatter={value =>
            !Number.isNaN(parseFloat(value))
              ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : '$ '
          }
        />
        <Group position="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default PaymentForm;
